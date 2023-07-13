from django.contrib import admin
from django.urls import path , include
# from django.conf.urls import url
from django.urls import re_path as url
from django.conf import settings
from django.conf.urls.static import static
from . import views
from django.views.generic import RedirectView

urlpatterns = [
    path('home', views.index, name='index'),
    url(r'^$', RedirectView.as_view(url='home'), name="main-view"),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),
    path('service', views.service, name='service'),
    path('gallary', views.gallary, name='gallary'),
    path('service', views.service, name='service'),
    path('team', views.team, name='team'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('appointment/',views.appointment,name='appointment'),
    path('check_otp/', views.check_otp, name='check_otp'),
    path('feedback/', views.feedback, name='feedback'),

    path('single_service/<int:pk>', views.single_service, name='single_service'),

] + static(settings.MEDIA_URL , document_root=settings.MEDIA_ROOT)