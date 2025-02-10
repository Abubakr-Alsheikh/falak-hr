# This file determines which settings file to use based on an environment variable.

import os

# Determine the settings module based on the DJANGO_SETTINGS_MODULE environment variable.
# Default to development settings if the variable is not set.
settings_module = os.environ.get('DJANGO_SETTINGS_MODULE', 'falak_hr_backend.settings.dev')

if settings_module == 'falak_hr_backend.settings.dev':
    from .dev import *
elif settings_module == 'falak_hr_backend.settings.prod':
    from .prod import *
else:
    raise ValueError(f"Invalid DJANGO_SETTINGS_MODULE: {settings_module}")