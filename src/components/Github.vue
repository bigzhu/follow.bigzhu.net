<template>
  <div>
    <div class="description">
      {{type}} <a :href='repoUrl' target='_blank'>{{repoName}}</a>
      <p v-html="issueContent">
      </p>
      <li v-for="(commit, index) in commits" :key="index">
        <a target="_blank" :href="commit.url.replace('api.github.com/repos', 'github.com')">
          {{commit.message}}
        </a>
      </li>
      <p v-html="issueCommentLink">
      </p>
      <p v-show="issueCommentBody" v-html="markedIssueCommentBody"></p>
    </div>
  </div>
</template>

<script>
  // import store from '../store'
  import marked from 'marked'
  import _ from 'lodash'
  export default {
    props: ['message'],
    computed: {
      markedIssueCommentBody: () => {
        if (this.issueCommentBody) {
          return marked(this.issueCommentBody, {
            sanitize: true
          })
        }
      },
      repoUrl: function () {
        return this.message.content.repo.url.replace('api.github.com/repos', 'github.com')
      },
      repoName: function () {
        return this.message.content.repo.name
      },
      repoLink: function () {
        return '<a href="' + this.repoUrl + '" target="_blank">' + this.repoName + '</a>'
      },
      type: function () {
        return this.message.content.type
      },
      payload: function () {
        return this.message.content.payload
      },
      action: function () {
        return this.payload.action
      },
      commits: function () {
        return this.payload.commits
      },
      issue: function () {
        if (_.has(this.payload, 'issue')) {
          return this.payload.issue
        }
      },
      issueLink: function () {
        var issueLink
        if (this.issue) {
          issueLink = '<a target="_blank" href="' + this.issue.htmlUrl + '" >' + this.issue.title + '</a>'
          return issueLink
        }
      },
      issueContent: function () {
        var content
        content = ''
        if (this.action) {
          content = this.action + ' ' + (this.issueLink || '')
          return content
        }
      },
      issueCommentLink: function () {
        var issueCommentLink, issueCommentURL
        if (this.issue) {
          if (!this.payload.comment) {
            return
          }
          issueCommentURL = this.payload.comment.htmlUrl
          issueCommentLink = '<a target="_blank" href="' + issueCommentURL + '" >' + this.issue.title + '</a>'
          return issueCommentLink
        }
      },
      issueCommentBody: function () {
        if (_.has(this.payload, 'comment')) {
          return this.payload['comment']['body']
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
