# -*- coding: utf-8 -*-

from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework import decorators
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

from .models import User, Profile
from .serializers import LocalAuthSerializer, ProfileSerializer
from . import permissions as custom_permissions


class UserViewSet(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    """A user ViewSet for user managing

    list:
    Return a list of all the profiles for existing users.

    retrieve:
    Return the profile for given user.

    update:
    Update the profile for current user.

    create:
    Create a new user instance, along with an initial profile.

    set_password:
    Update the password for current user.

    """

    queryset = User.objects.all()
    AUTH_METHODS = ['create', 'set_password']
    PERMISSION_DICT = {
        'list': [permissions.AllowAny],

        'retrieve': [permissions.AllowAny,
                     custom_permissions.OwnProfileToMod],

        'update': [permissions.IsAuthenticated,
                   custom_permissions.OwnProfileToMod],

        'partial_update': [permissions.IsAuthenticated,
                           custom_permissions.OwnProfileToMod],

        'create': [permissions.AllowAny],

        'set_password': [permissions.IsAuthenticated,
                         custom_permissions.OwnProfileToMod,
                         custom_permissions.IsCurrentUserToMod]
    }

    def get_queryset(self):
        if self.action in self.AUTH_METHODS:
            return User.objects.all()
        return Profile.objects.all()

    def get_serializer_class(self):
        if self.action in self.AUTH_METHODS:
            return LocalAuthSerializer
        return ProfileSerializer

    def get_permissions(self):
        if self.action in self.PERMISSION_DICT:
            return [permission() for permission in self.PERMISSION_DICT[self.action]]
        return []

    @decorators.list_route(['POST'])
    def set_password(self, request, *args, **kwargs):
        serializer = self.get_serializer_class()(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)













