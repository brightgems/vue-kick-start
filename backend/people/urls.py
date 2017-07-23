# -*- coding: utf-8 -*-

from django.conf.urls import url, include
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r'people', views.UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]

