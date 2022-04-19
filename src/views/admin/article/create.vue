<template>
  <div class="createPost-container">
    <el-form
      ref="postArticleForm"
      :model="postArticleForm"
      :rules="rules"
      class="form-container"
    >
      <div class="createPost-main-container">
        <el-form-item style="margin-bottom: 40px">
          <el-button v-loading="loading" type="success" @click="submitForm">
            发布
          </el-button>
          <el-button v-loading="loading" type="warning" @click="draftForm">
            草稿箱
          </el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px" prop="title">
          <MDinput
            v-model="postArticleForm.title"
            :maxlength="100"
            name="name"
            required
          >
            标题
          </MDinput>
        </el-form-item>
        <el-form-item label="标签">
          <el-select
            v-model="postTagForm.tags"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="showTagNotice"
            :loading="loading">
            <el-option
              v-for="item in tags"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="content" style="margin-bottom: 30px">
          <Tinymce
            ref="editor"
            v-model="postArticleForm.content"
            :height="400"
          />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import { fetchArticle, uploadArticle, searchTagByKeyword } from '@/api/article'
import { getToken } from '@/utils/auth'

const defaultArticleForm = {
  status: 0,
  title: '', // 文章题目
  content: '' // 文章内容
}

const defaultTagForm = {
  tags: []
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      email: '',
      token: getToken(),
      tags_model: [],
      tags: [
      ],
      postArticleForm: Object.assign({}, defaultArticleForm),
      postTagForm: Object.assign({}, defaultTagForm),
      loading: false,
      userListOptions: [],
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return +new Date(this.postArticleForm.display_time)
      },
      set(val) {
        this.postArticleForm.display_time = new Date(val)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchArticle(id)
        .then((response) => {
          this.postArticleForm = response.data

          // just for test
          this.postArticleForm.title += `   Article Id:${this.postArticleForm.id}`

          // set tagsview title
          this.setTagsViewTitle()

          // set page title
          this.setPageTitle()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    showTagNotice(query) {
      query = query.trim()
      if(query == '') {
        return
      }
      searchTagByKeyword({token: this.token, params: {keyword: query}}).then(response => {
        var tagSugs = response.data
        this.tags = []
        for (let i = 0; i < tagSugs.length; i++) {
            this.tags.push({
              value: tagSugs[i].id,
              label: tagSugs[i].name
            })
        }
        
      })
    },
    setTagsViewTitle() {
      const title = 'Edit Article'
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.postArticleForm.id}`
      })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postArticleForm.id}`
    },
    submitForm() {
      console.log(this.postArticleForm)
      this.$refs.postArticleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          uploadArticle({ article: this.postArticleForm, token: this.token }).then(
            (response) => {}
          )
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postArticleForm.status = 1
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (
        this.postArticleForm.content.length === 0 ||
        this.postArticleForm.title.length === 0
      ) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postArticleForm.status = 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
