# -*- coding: utf-8 -*-

from rest_framework import permissions

from . import models


class OwnProfileToMod(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return isinstance(obj, models.Profile) and (obj.user.pk == request.user.pk)


class IsCurrentUserToMod(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return isinstance(obj, models.User) and (obj.pk == request.user.pk)
