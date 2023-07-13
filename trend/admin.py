from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(User)
admin.site.register(Service_Category)
admin.site.register(Service)
admin.site.register(Expert)
admin.site.register(Contact)
admin.site.register(Appointment)
admin.site.register(Feedback)
admin.site.register(Photo_Gallary)

