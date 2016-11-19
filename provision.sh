#!/bin/bash

ansible-playbook --ask-vault-pass -i 192.168.1.12, -e @secrets.yml provision.yml $@
