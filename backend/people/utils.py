# -*- coding: utf-8 -*-

import os


def image_upload_to(instance, filename, prefix, suffix):
    filename = '{}/{}/{}.{}'.format(prefix, instance.pk, suffix, os.path.splitext(filename)[-1][1:])
    if os.path.exists(filename):
        os.remove(filename)
    return filename
