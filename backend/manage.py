#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import argparse

def main():
    """Run administrative tasks."""

    # Create the top-level parser
    parser = argparse.ArgumentParser(description="Django management command.")
    parser.add_argument(
        "--settings",
        help="Specify the settings module directly (e.g., falak_hr_backend.settings.dev).",
    )

    # --- VERY IMPORTANT:  Parse *known* arguments *first* ---
    # This gets --settings, and any other top-level arguments we define,
    # *without* interfering with Django's subcommands.
    known_args, remaining_args = parser.parse_known_args()

    # Set DJANGO_SETTINGS_MODULE based on priority:
    if known_args.settings:
        os.environ['DJANGO_SETTINGS_MODULE'] = known_args.settings
    elif 'DJANGO_SETTINGS_MODULE' not in os.environ:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'falak_hr_backend.settings.dev')

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # --- Pass *all* remaining arguments to execute_from_command_line ---
    # This includes the Django subcommand (runserver, migrate, etc.)
    # *and* any arguments for that subcommand.
    execute_from_command_line([sys.argv[0]] + remaining_args)


if __name__ == '__main__':
    main()