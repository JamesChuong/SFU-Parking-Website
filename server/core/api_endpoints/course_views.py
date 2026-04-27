from itertools import chain

from django.http import Http404, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.models import Course, LectureSection, NonLectureSection, Department
from core.serializers.course_serializers import CourseSerializer
from core.utils import check_time_conflicts


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_course(request, department, course_number):
    try:

        # Check if the course exists in our database of all courses
        course = get_object_or_404(Course, department_code=department, course_number=course_number)

        return Response(CourseSerializer(course).data, status=status.HTTP_200_OK)

    except Http404 as e:

        return Response({"error": "Course does not exist"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fetch_all_courses(request):
    courses = Course.objects.all().values()
    return JsonResponse(list(courses), safe=False, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_lecture_sections(request, course_id: int):
    try:

        course = get_object_or_404(Course, id=course_id)

        lecture_sections = course.lecture_sections.all()  # Fetch related lecture sections

        # Non-lecture sections which are meant to be taken on their own (e.g, physics labs)
        standalone_non_lecture_sections = NonLectureSection.objects.filter(lecture_section=None, title=course.title)

        lectures = [{"id": ls.id, "department_code": ls.department_code, "course_number": ls.course_number, "title": ls.title,
                 "section_code": ls.section_code, "professor": ls.professor, "schedule": ls.schedule,
                 "start_date": ls.start_date, "end_date": ls.end_date, "campus": ls.campus}
                for ls in lecture_sections
                ]

        non_lectures = [{"id": ls.id, "department_code": ls.department_code, "course_number": ls.course_number, "title": ls.title,
                 "section_code": ls.section_code, "professor": ls.professor, "schedule": ls.schedule,
                 "start_date": ls.start_date, "end_date": ls.end_date, "campus": ls.campus}
                for ls in standalone_non_lecture_sections
                ]

        lectures.extend(non_lectures)

        return JsonResponse(lectures, safe=False, status=status.HTTP_200_OK)

    except Http404 as e:

        return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_non_lecture_sections(request, lecture_section_id):

    lecture_section = LectureSection.objects.filter(id=lecture_section_id).first()
    if not lecture_section:

        return JsonResponse([], safe=False, status=status.HTTP_200_OK)

    non_lecture_sections = lecture_section.non_lecture_sections.all()  # Use the new related_name

    data = [
        {"id": nls.id, "department_code": nls.department_code, "course_number": nls.course_number, "title": nls.title, "section_code": nls.section_code,
         "professor": nls.professor, "schedule": nls.schedule,
         "start_date": nls.start_date, "end_date": nls.end_date, "campus": nls.campus}
        for nls in non_lecture_sections
    ]
    return JsonResponse(data, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_departments(request):

    departments = Department.objects.all().values()
    return JsonResponse(list(departments), safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_department_courses(request, department_id):

    try:

        department = get_object_or_404(Department, id=department_id)
        courses = department.courses.all()
        course_data = [
            {
                "id": course.id,
                "title": course.title,
                "department_code": course.department_code,
                "course_number": course.course_number
            }
            for course in courses
        ]

        return JsonResponse(list(course_data), safe=False, status=status.HTTP_200_OK)

    except Http404 as e:

        return Response({"error": "Department not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def validate_course_schedule(request):

    courses = request.data.get('courses', [])

    try:
        check_time_conflicts(courses)
        return Response({"success": "No conflicts detected"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
