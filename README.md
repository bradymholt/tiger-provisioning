# goblin-provisioning

This is the repository containing an Ansible playbook for provisioning my Raspberry Pi running Arch Linux ARM which is sitting in my closet.

<img src="https://cloud.githubusercontent.com/assets/759811/20446573/fa820624-ad9f-11e6-8cfb-554aca927988.png" width="500px">

# Instructions

## Setup Arch Linux ARM on Raspberry Pi

1. Following the [Mount SD card in VirtualBox from Mac OS X Host](Mount SD card in VirtualBox from Mac OS X Host) guide to get access to SD Card from VirtualBox running on OS X host.
1. Prepare SD Card with [these instructions](https://archlinuxarm.org/platforms/armv6/raspberry-pi)
2. Before running `umount boot root` from above, run `sync`.
3. After tunning  `umount boot root` from above, shutdown VirtualBox and then Eject the SD Card from OS X.
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
2. `provision.sh` (ansible-vault password located in LastPass > Secure Notes > Applications Secrets > "goblin ansible-vault")
3. Manual insync configuration - After provisioning is complete, insync needs to be configured manually since it cannot be automated.
   1. Go to [https://goo.gl/jv797S](https://goo.gl/jv797S), login with the [john.doe@gmail.com] account and get an auth code.
   2. Run `insync add_account -a [auth_token_just_obtained_above] -p '{{insync_sync_directory}}`
   3. Run `insync manage_selective_sync john.doe@gmail.com`
   4. Type `^X` and then selected "Uncheck all".
   5. Navigate down to "Movies" and use the `Space` key to select it.
   6. Use the `Tab` key until "OK" is selected.  Use `Enter` key to save and exit.

To only update the vistaicm-server hooks, you can run `copy-hooks.sh`.
