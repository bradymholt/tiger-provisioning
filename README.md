# Instructions

## Setup Arch Linux ARM on Raspberry Pi

1. Prepare SD Card with [these instructions](https://archlinuxarm.org/platforms/armv6/raspberry-pi) (run sync after `mv root/boot/* boot` and before umount)
2. Insert SD Card into Pi and boot

## Setup DNS/DHCP

1. Add [domain].geekytidbits.com as DDNS domain on freedns.afraid.org
2. In LAN Router (Tomato) at http://192.168.1.1
 - Go to Status > Device List and find device with name `alarmpi`.
 - Click `[static]` (redirects to Basic > Static DHCP/ARP/IPT) and configure a static IP of 192.168.1.12.
 - Go to Basic > DDNS and setup FreeDNS DDNS update with correct Token for [domain].geekytidbits.com
 - Go to Port Forwarding config and map external 81 to internal 192.168.1.12:3900

## Pre-provisioning

1. ssh alarm@[IP from device list] (password: alarm)
2. `su root` (password: root)
3. `mkdir ~/.ssh`
4. `curl -o ~/.ssh/authorized_keys https://github.com/bradyholt.keys`
5. `sudo reboot`

## Provisioning

1. Ensure Ansible 2.2 is installed
2. `ansible-playbook --ask-vault-pass -i 192.168.1.12, -e @config.yml provision.yml` (ansible-value password located in LastPass > Secure Notes > Applications Secrets > "goblin ansible-vault")
 