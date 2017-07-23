# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

import functools

from . import utils


class Profile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', unique=True)

    nickname = models.CharField(_('nickname'), max_length=150)
    avatar = models.ImageField(_('avatar'), blank=True,
                               upload_to=functools.partial(utils.image_upload_to, prefix='avatar', suffix='avatar'))

    first_name = models.CharField(_('first name'), max_length=10, blank=True)
    last_name = models.CharField(_('last name'), max_length=5, blank=True)
    personal_id = models.CharField(_('personal id'), max_length=18, blank=True)
    photo = models.ImageField(_('photo'), blank=True,
                              upload_to=functools.partial(utils.image_upload_to, prefix='photo', suffix='photo'))
    MALE = _('male')
    FEMALE = _('female')
    SECRET = _('secret')
    GENDER_CHOICES = (
        (MALE, MALE),
        (FEMALE, FEMALE),
        (SECRET, SECRET)
    )
    gender = models.CharField(_('gender'), max_length=6, choices=GENDER_CHOICES, default=SECRET)

    phone = models.CharField(_('phone'), max_length=11, blank=True)
    email = models.EmailField(_('email'), blank=True)
    blog = models.URLField(_('blog'), blank=True)
    intro = models.TextField(_('intro'), blank=True)

    STUDENT = _('student')
    TEACHER = _('teacher')
    ROLE_CHOICES = (
        (STUDENT, STUDENT),
        (TEACHER, TEACHER)
    )
    role = models.CharField(_('role'), max_length=7, choices=ROLE_CHOICES, default=STUDENT)
    school_id = models.CharField(_('school id'), max_length=11, blank=True)
    #supervisor = models.ForeignKey(User, related_name='supervisor_of', verbose_name=_('supervisor'), blank=True)
    company = models.CharField(_('company'), max_length=150, blank=True)

    def __str__(self):
        return self.nickname

    def get_full_name(self):
        return self.last_name + " " + self.first_name
