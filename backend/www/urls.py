# -*- coding:utf-8 -*-


from django.conf.urls import url, include, i18n
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.conf import settings
from rest_framework import schemas


urlpatterns = [
    #url(r'^i18n/', include('django.conf.urls.i18n')),
    url(r'^admin/', admin.site.urls),
    url(r'^$', TemplateView.as_view(template_name='index.html'), name='index'),

    url(r'^api-auth', include('rest_framework.urls', namespace='rest_framework')),
    url(r'schema', schemas.get_schema_view('www')),

    url(r'^', include('people.urls')),
    url(r'^api', include('api.urls'))
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
