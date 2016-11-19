# goblin-provisioning

This is the repository containing an Ansible playbook for provisioning my Raspberry Pi running Arch Linux ARM which is sitting in my closet.

<img src="https://cloud.githubusercontent.com/assets/759811/20446573/fa820624-ad9f-11e6-8cfb-554aca927988.png" width="500px">

# Instructions

## Setup Arch Linux ARM on Raspberry Pi

1. Prepare SD Card with [these instructions](https://archlinuxarm.org/platforms/armv6/raspberry-pi) (run sync after `mv root/boot/* boot` and before umount)
2. Insert SD Card into Pi and boot

## Setup DNS/DHCP

1. Setup DDNS domain on freedns.afraid.org
2. In LAN Router (Tomato) at http://192.168.1.1
 - Go to Status > Device List and find device with name `alarmpi`
 - Click `[static]` (redirects to Basic > Static DHCP/ARP/IPT) and configure a static IP of 192.168.1.12
 - Go to Basic > DDNS and setup FreeDNS DDNS update with correct Token for domain
 - Go to Port Forwarding config and map external port 81 to internal 192.168.1.12:3900

## Pre-provisioning

1. `ssh alarm@[IP from device list]` (password: alarm)
2. `su root` (password: root)
3. `mkdir ~/.ssh`
4. `curl -o ~/.ssh/authorized_keys https://github.com/bradyholt.keys`
5. `sudo reboot`

## Provisioning

1. Ensure Ansible 2.2 is installed
2. `ansible-playbook --ask-vault-pass -i 192.168.1.12, -e @secrets.yml provision.yml` (ansible-vault password located in LastPass > Secure Notes > Applications Secrets > "goblin ansible-vault")
 
