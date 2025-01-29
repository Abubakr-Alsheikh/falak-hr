from django.core.management.base import BaseCommand
from companies.models import Company
from django.contrib.auth.models import User
from employees.models import Employee
from tasks.models import Task

class Command(BaseCommand):
    help = 'Populates the database with initial data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Populating database...'))

        # Create Companies
        company1 = Company.objects.create(name="Falak HR Main")
        company2 = Company.objects.create(name="Falak HR Sub Company 1", parent_company=company1)

        # Create Users and Employees
        user_admin = User.objects.create_superuser('admin', 'admin@example.com', 'adminpassword')
        employee_admin = Employee.objects.create(user=user_admin, company=company1, role='admin')

        user_manager = User.objects.create_user('manager1', 'manager1@example.com', 'managerpassword')
        employee_manager = Employee.objects.create(user=user_manager, company=company1, role='manager')

        user_employee1 = User.objects.create_user('employee1', 'employee1@example.com', 'employeepassword')
        employee1 = Employee.objects.create(user=user_employee1, company=company2, role='employee')

        # Create Tasks
        task1 = Task.objects.create(company=company1, title="Company Setup", description="Initial setup for Falak HR")
        task1.assigned_to.add(employee_admin, employee_manager)

        task2 = Task.objects.create(company=company2, title="Employee Onboarding", description="Onboarding new remote employees")
        task2.assigned_to.add(employee1)

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))

# Run command
# py .\manage.py populate_db