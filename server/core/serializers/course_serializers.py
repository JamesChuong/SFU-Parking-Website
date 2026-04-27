from rest_framework import serializers

from core.models import Course, LectureSection, NonLectureSection


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["title", "department", "course_number"]

    def create(self, validated_data):
        course = Course.objects.create(**validated_data)
        return course


class LectureSectionSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)

    class Meta:
        model = LectureSection
        fields = '__all__'


class NonLectureSectionSerializer(serializers.ModelSerializer):
    lecture_section = LectureSectionSerializer(read_only=True)

    class Meta:
        model = NonLectureSection
        fields = '__all__'
