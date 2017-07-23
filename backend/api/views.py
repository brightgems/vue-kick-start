from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_POST,require_GET,require_http_methods
import json
# Create your views here.

#@require_http_methods(['POST'])
def test(request):
    json_data = {'foo':'beauty & smart'}
    return HttpResponse(json.dumps(json_data), content_type= 'application/json')