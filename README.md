# tiger-provisioning

This is the repository containing an Ansible playbook for provisioning my Raspberry Pi running Arch Linux ARM which is sitting in my closet.

<img src="https://cloud.githubusercontent.com/assets/759811/20446573/fa820624-ad9f-11e6-8cfb-554aca927988.png" width="500px">

# Instructions

## Setup Arch Linux ARM on Raspberry Pi

1. Follow the [Mount SD card in VirtualBox from Mac OS X Host](http://www.geekytidbits.com/mount-sd-card-virtualbox-from-mac-osx/) guide to get access to SD Card from VirtualBox running on OS X host.
2. Prepare SD Card with [these instructions](https://archlinuxarm.org/platforms/armv6/raspberry-pi)
2. Before running `umount boot root` from above, run `sync`.
3. After running  `umount boot root` from above, shutdown VirtualBox and then Eject the SD Card from OS X.
2. Insert SD Card into Pi and boot

## Pre-provisioning

1. `ssh alarm@[IP from device list]` (password: alarm)
2. `su root` (password: root)
3. `mkdir ~/.ssh`
4. `curl -o ~/.ssh/authorized_keys https://github.com/bradyholt.keys`
5. `reboot`

## Provisioning

1. Ensure Ansible 2.2 is installed
2. `provision.sh` (ansible-vault password located Google Drive > Secrets > Passwords)

## vistaicm-server

vistaicm-server can be updated partially, either by deploying the hooks or by deploying the latest version of the code from the local development folder.

- To only update the vistaicm-server hooks, you can run `copy-hooks.sh`.
- To copy over the latest ~/dev/vistaicm-server/server.js file and restart the server, run `./scripts/deploy-vistaicm-server.sh`.

### Honeywell VISA ICM Configuration

 - Device Address = 18
 - Setup site: http://192.168.1.28/setup
 - Mobile site: http://192.168.1.28/pda

