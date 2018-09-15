import { observable } from "mobx"

class PostsStore {
    @observable data = new Map()
    @observable title = "Hello World"

    setData (posts) {
      posts.forEach(post => {
        this.data.set(post.id, post)
      })
    }
}

export const postsStore = new PostsStore()
