from datetime import datetime
from django.db import IntegrityError, transaction
from django.http import Http404
from rest_framework import status
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

from core.models import User, LectureSection, NonLectureSection, NewSemesterNotification
from core.serializers.course_serializers import LectureSectionSerializer, NonLectureSectionSerializer
from core.serializers.notification_serializer import NewSemesterNotificationSerializer
from core.serializers.user_serializer import UserSerializer
from core.utils import check_time_conflicts, refresh_courses_if_stale
from core.serializers.registration_verification_code_serializers import *

from core.serializers.registration_verification_code_serializers import \
    RegistrationVerificationCodeSerializer, RegistrationVerifyOTPSerializer


class UserView(APIView):

    def get_permissions(self):
        if self.request.method == "GET" or self.request.method == "DELETE" or self.request.method == "PUT":
            return [IsAuthenticated()]
        return [AllowAny()]

    # Retrieve user info if logged in
    def get(self, request):

        refresh_courses_if_stale()

        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

    def delete(self, request):

        # Remove any outstanding tokens currently used
        for token in OutstandingToken.objects.filter(user=request.user):
            BlacklistedToken.objects.get_or_create(token=token)

        request.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request):

        try:

            with transaction.atomic():

                user = request.user
                serializer = UserSerializer(user, data=request.data)

                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except IntegrityError:

            return Response({"error": "User with that username or email already exists"},
                            status=status.HTTP_400_BAD_REQUEST)


# Validates the user credentials for signup
@api_view(["POST"])
def validate_user_credentials(request):

    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    verification_code_serializer = RegistrationVerificationCodeSerializer(data=request.data)
    verification_code_serializer.is_valid(raise_exception=True)

    return Response({"success": f"Verification code sent to {request.data['email']}."}, status=status.HTTP_200_OK)


@api_view(["POST"])
def validate_registration_code(request):
    serializer = RegistrationVerifyOTPSerializer(data=request.data)

    serializer.is_valid(raise_exception=True)

    return Response({"success": "OTP verified."}, status=status.HTTP_200_OK)


# Retrieves all courses (lecture sections and non lecture sections) for a user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_courses(request):
    user = request.user
    lecture_sections = user.lecture_sections.all()
    non_lecture_sections = user.non_lecture_sections.all()
    response_data = {
        "lecture_sections": LectureSectionSerializer(lecture_sections, many=True).data,
        "non_lecture_sections": NonLectureSectionSerializer(non_lecture_sections, many=True).data
    }
    return Response(response_data, status=status.HTTP_200_OK)


# Deletes all courses from a user's schedule
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_courses(request):
    try:

        with transaction.atomic():
            user = request.user
            user.lecture_sections.clear()
            user.non_lecture_sections.clear()
            user.save()
            return Response({"success": "All courses removed from schedule"}, status=status.HTTP_200_OK)

    except IntegrityError:

        return Response({"error": "Could not remove your courses"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Adds a list of courses (lecture section or non lecture section) to a user's schedule
# Used for bulk adding courses as a single transaction
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_course_to_schedule(request):

    # List of lecture/non-lecture sections to add to the user's schedule
    courses = request.data.get("courses", [])
    user = request.user

    try:

        with transaction.atomic():

            for course in courses:

                department = course.get("department_code")
                course_number = course.get("course_number")
                section_code = course.get("section_code")

                check_time_conflicts(courses)

                lecture_section = LectureSection.objects.filter(department_code=department, course_number=course_number,
                                                                section_code=section_code).first()

                if lecture_section:
                    user.lecture_sections.add(lecture_section)

                else:
                    non_lecture_section = NonLectureSection.objects.filter(department_code=department,
                                                                           course_number=course_number,
                                                                           section_code=section_code).first()

                    if non_lecture_section:
                        user.non_lecture_sections.add(non_lecture_section)

            user.save()

            return Response({"success": "Courses added to schedule"}, status=status.HTTP_200_OK)

    except IntegrityError:

        return Response({"error": "Could not add courses to schedule"}, status=status.HTTP_400_BAD_REQUEST)

    except Http404:

        return Response({"error": "One or more courses not found"}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:

        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def remove_course_from_schedule(request):
    department = request.data["department"]
    course_number = request.data["course_number"]
    section_code = request.data["section_code"]

    with transaction.atomic():
        user = request.user

        lecture_section = LectureSection.objects.filter(department_code=department, course_number=course_number,
                                                        section_code=section_code).first()

        if lecture_section:

            non_lecture_section = user.non_lecture_sections.filter(lecture_section=lecture_section).first()

            user.lecture_sections.remove(lecture_section)
            if non_lecture_section:
                user.non_lecture_sections.remove(non_lecture_section)

        else:

            non_lecture_section = NonLectureSection.objects.filter(department_code=department, course_number=course_number,
                                                                   section_code=section_code).first()

            if non_lecture_section:
                user.non_lecture_sections.remove(non_lecture_section)

        user.save()

        return Response({"success": "Section removed successfully"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_next_class(request):
    user = request.user
    # Enforce Vancouver timezone for accurate class scheduling
    vancouver_tz = ZoneInfo("America/Vancouver")
    now = datetime.now(vancouver_tz)

    # Map python weekday (0=Monday) to schedule string format
    days_map = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
    current_day_str = days_map[now.weekday()]
    current_time_str = now.strftime("%H:%M")

    upcoming_classes = []

    def check_sections(sections):
        for section in sections:
            if not section.schedule:
                continue
            for block in section.schedule:
                if current_day_str in block.get("days", ""):
                    start_time = block.get("startTime")
                    if start_time and start_time > current_time_str:
                        h, m = map(int, start_time.split(':'))

                        # Format time for display without leading 0, e.g. "02:30 PM" to "2:30 PM"
                        display_time = datetime.strptime(start_time, "%H:%M").strftime("%I:%M %p").lstrip('0')

                        upcoming_classes.append({
                            "title": section.title,
                            "nextStartTime": start_time,
                            "displayTime": display_time,
                            "startTimeInMinutes": h * 60 + m,
                            "campus": section.campus,
                        })

    check_sections(user.lecture_sections.all())
    check_sections(user.non_lecture_sections.all())

    if not upcoming_classes:
        return Response(None, status=status.HTTP_204_NO_CONTENT)

    # Sort by start time (earliest first)
    upcoming_classes.sort(key=lambda x: x['startTimeInMinutes'])

    return Response(upcoming_classes[0], status=status.HTTP_200_OK)


# Gets a notification for the user that the new semester has started
# Once received, the notification is deleted to save DB space
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_new_semester_notification(request):

    user = request.user

    with transaction.atomic():

        notification = NewSemesterNotification.objects.select_for_update().filter(user=user).first()

        if notification:

            response = Response(NewSemesterNotificationSerializer(notification).data, status=status.HTTP_200_OK)

            notification.delete()

        else:

            response = Response(None, status=status.HTTP_200_OK)

    return response
