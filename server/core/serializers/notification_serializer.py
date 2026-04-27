from rest_framework import serializers

from core.models import NewSemesterNotification


class NewSemesterNotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = NewSemesterNotification
        fields = '__all__'
