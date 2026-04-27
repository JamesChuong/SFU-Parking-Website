from django.contrib.auth import get_user_model
import os

User = get_user_model()

if not User.objects.filter(username=os.getenv("ADMIN_USERNAME", "admin")).exists():
    User.objects.create_superuser(
        username=os.getenv("ADMIN_USERNAME", "admin"),
        email=os.getenv("ADMIN_EMAIL", "admin@example.com"),
        password=os.getenv("ADMIN_PASSWORD", "adminpassword"),
    )