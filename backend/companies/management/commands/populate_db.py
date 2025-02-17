from django.core.management.base import BaseCommand
from companies.models import Company
from django.contrib.auth.models import User
from users.models import UserProfile
from tasks.models import Task
import os
from dotenv import load_dotenv


class Command(BaseCommand):
    help = "Populates the database with initial data"

    def handle(self, *args, **options):
        load_dotenv()

        self.stdout.write(self.style.SUCCESS("Populating database..."))

        # Create Companies
        company1 = Company.objects.create(name="Falak HR Main 3")
        company2 = Company.objects.create(
            name="Falak HR Sub Company 1 3", parent_company=company1
        )

        # --- Get credentials from environment variables ---
        admin_username = os.getenv("ADMIN_USERNAME")
        admin_email = os.getenv("ADMIN_EMAIL")
        admin_password = os.getenv("ADMIN_PASSWORD")

        manager_username = os.getenv("MANAGER_USERNAME")
        manager_email = os.getenv("MANAGER_EMAIL")
        manager_password = os.getenv("MANAGER_PASSWORD")

        employee_username = os.getenv("EMPLOYEE_USERNAME")
        employee_email = os.getenv("EMPLOYEE_EMAIL")
        employee_password = os.getenv("EMPLOYEE_PASSWORD")
        # -------------------------------------------------

        # Create Users and Employees
        user_admin = User.objects.create_superuser(
            admin_username, admin_email, admin_password
        )
        employee_admin = UserProfile.objects.create(
            user=user_admin, company=company1, role="admin"
        )

        user_manager = User.objects.create_user(
            manager_username, manager_email, manager_password
        )
        employee_manager = UserProfile.objects.create(
            user=user_manager, company=company1, role="manager"
        )

        user_employee1 = User.objects.create_user(
            employee_username, employee_email, employee_password
        )
        employee1 = UserProfile.objects.create(
            user=user_employee1, company=company2, role="employee"
        )

        # Create Tasks
        task1 = Task.objects.create(
            company=company1,
            title="Company Setup",
            description="Initial setup for Falak HR",
        )
        task1.assigned_to.add(employee_admin, employee_manager)

        task2 = Task.objects.create(
            company=company2,
            title="Employee Onboarding",
            description="Onboarding new remote employees",
        )
        task2.assigned_to.add(employee1)

        self.stdout.write(self.style.SUCCESS("Database populated successfully!"))


# Run command
# py .\manage.py populate_db