#!/usr/bin/env node
'use strict'

const execa = require('execa')
const isGit = require('is-git-repository')
const open = require('open')

async function openGitHub() {
  if (isGit()) {
    const remoteOrigin = await execa('git', ['config', '--get', 'remote.origin.url'])
    const httpRegex = /http(s)?:\/\/github\./gi
    const githubSshRegex = /git\@github\.com:/gi
    const wwtSshRegex = /git\@github\.wwt\.com:/gi
    const githubHttp = 'https://github.com/'
    const wwtHttp = 'https://github.wwt.com/'
    const gitUrl = remoteOrigin.stdout.replace(/\.git$/gi, '') // remove trailing '.git' from url
    
    if (gitUrl.match(httpRegex)) {
      // it's already an http link, just open it.
      open(gitUrl)
    } else if (gitUrl.match(githubSshRegex)) {
      // public github
      open(gitUrl.replace(githubSshRegex, githubHttp))
    } else if (gitUrl.match(wwtSshRegex)) {
      // WWT github
      open(gitUrl.replace(wwtSshRegex, wwtHttp))
    }
  } else {
    // not a git repo.
    console.log('`git-open` must be run inside of a directory that has been git initialized.')
  }
  
  return
}

openGitHub()