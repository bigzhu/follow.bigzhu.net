<template>
  <div>
    <div class="description">
      {{type}} <a :href='repo_url' target='_blank'>{{repo_name}}</a>
      <p v-html="issue_content">
      </p>
      <li v-for="(commit, index) in commits" :key="index">
        <a target="_blank" :href="commit.url.replace('api.github.com/repos', 'github.com')">
          {{commit.message}}
        </a>
      </li>
      <p v-html="issueCommentLink">
      </p>
      <p v-show="issue_comment_body" v-html="marked_issue_comment_body"></p>
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
      marked_issue_comment_body: () => {
        if (this.issue_comment_body) {
          return marked(this.issue_comment_body, {
            sanitize: true
          })
        }
      },
      repo_url: function () {
        return this.message.content.repo.url.replace('api.github.com/repos', 'github.com')
      },
      repo_name: function () {
        return this.message.content.repo.name
      },
      repo_link: function () {
        return '<a href="' + this.repo_url + '" target="_blank">' + this.repo_name + '</a>'
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
          issueLink = '<a target="_blank" href="' + this.issue.html_url + '" >' + this.issue.title + '</a>'
          return issueLink
        }
      },
      issue_content: function () {
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
          issueCommentURL = this.payload.comment.html_url
          issueCommentLink = '<a target="_blank" href="' + issueCommentURL + '" >' + this.issue.title + '</a>'
          return issueCommentLink
        }
      },
      issue_comment_body: function () {
        if (_.has(this.payload, 'comment')) {
          return this.payload['comment']['body']
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
