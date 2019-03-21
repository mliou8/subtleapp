
/**
 * @type {*}
 */
const polyfetch = (typeof(fetch) === "function") ? fetch : require("node-fetch");
const qs = require("qs");

/**
  * @typedef {Object} User
  * @property {Number=} uid
  * @property {String=} name
  * @property {String=} pic_small
  * @property {String=} pic_large
  * @property {String=} bio
  * @property {String=} location
  * @property {Object[]=} social
  * @property {String=} social.type
  * @property {String=} social.handle
  * @property {String=} user_created_time
  * @property {Post[]=} recent_posts
  */


/**
  * @typedef {Object} Reaction
  * 
  * @property {String} reaction
  * Reaction - 'like', 'love', 'lol'
  * 
  * @property {Number} count
  * Count of this reaction
  * 
  */

/**
  * @typedef {Object} Comment
  * 
  * @property {Number} cid
  * Comment ID - primary identifier for this comment
  * 
  * @property {String} caption
  * Text of comment
  * 
  * @property {String} created_time
  * Time comment was created
  * 
  * @property {Number} comment_on
  * Post ID comment was created under
  * 
  * @property {String} user_reaction
  * Reaction by this user - null if no reaction
  * 
  * @property {Reaction[]} reactions
  * Reactions to this comment
  * 
  * @property {User} created_by
  * User object of user who created this post
  * 
  */

/**
  * @typedef {Object} Post
  * 
  * @property {Number=} pid
  * Post ID - primary identifier for this post
  * 
  * @property {User=} created_by
  * Lightweight user object who created this post
  * 
  * @property {String=} created_time
  * Time created - date string
  * 
  * @property {String} type
  * Post type: e.g. 'meme' or 'dating'
  * 
  * @property {String=} topic
  * Post topic (any string; no validation)
  * 
  * @property {String=} title
  * Title of the post. Some post types won't have a title.
  * 
  * @property {String} caption
  * Text of post
  * 
  * @property {Object[]} media
  * Array of media associated with this post
  * 
  * @property {String} media.type
  * Type of media - "image" or "video"
  * 
  * @property {String} media.url
  * URL of media
  * 
  * @property {String=} location
  * Location of post
  * 
  * @property {Number=} comment_count
  * Number of comments on this post
  * 
  * @property {String=} expires_at
  * Time post expires (string encoded)
  * 
  * @property {String=} user_reaction
  * Reaction by this user - null if no reaction
  * 
  * @property {Reaction[]=} reactions
  * Reactions to this post
  * 
  * @property {Comment[]=} comments
  * Comments on this post - may be omitted if getting posts through a feed
  * 
  */

let currentClient = null;

class Client {
    /**
     * @returns {Client} last created client instance
     */
    static current() {
        return currentClient;
    }

    /**
     * Call if you have a jwt token saved already
     * @param {String} endpoint server endpoint - e.g. https://www.subtleasian.app/ws
     */
    constructor(endpoint) {
        this.endpoint = endpoint;
        currentClient = this;
    }

    /**
     * Checks if an account exists
     * @param {*} firebase_id_token 
     */
    async doesAccountExist(firebase_id_token) {
        return await request({
            uri: this.endpoint + "/accounts/exists",
            method: "GET",
            qs: {
                firebase_id_token: firebase_id_token
            }
        });
    }

    /**
     * Login with firebase (app first run)
     * @param {*} firebase_id_token firebase id token
     * @returns {Promise<User>}
     */
    async loginWithFirebase(firebase_id_token) {
        let res = await request({
            uri: this.endpoint + "/accounts/login",
            method: "GET",
            qs: {
                firebase_id_token: firebase_id_token
            }
        });
        
        this.token = res;
        return await this.getUserSelf();
    }

    /**
     * Login with token (app subsequent runs)
     * @param {String} token jwt token saved from previous execution of the app
     * @returns {Promise<User>}
     */
    async loginWithToken(token) {
        this.token = token;

        return await this.getUserSelf();
    }

    /**
     * Gets the login token
     * @returns {String} token
     */
    getToken() {
        return this.token;
    }

    /**
     * Gets user's own profile (cached; may return null)
     * @returns {User}
     */
    getUserSelfCached() {
        return this.cachedUser;
    }

    /**
     * Gets user's own profile (online call)
     * @returns {Promise<User>}
     */
    async getUserSelf() {
        let res = await request({
            uri: this.endpoint + "/users/self",
            method: "GET",
            qs: {
                token: this.token
            }
        });

        this.cachedUser = res;
        return res;
    }


    /**
     * Deletes the user
     */
    async deleteUser() {
        return await request({
            uri: this.endpoint + "/users/self",
            method: "DELETE",
            body: {
                token: this.token
            }
        });
    }

    /**
     * Gets a user with details
     * @returns {Promise<User>}
     */
    async getUserDetails(uid) {
        return await request({
            uri: this.endpoint + "/users/" + uid,
            method: "GET",
            qs: {
                token: this.token
            }
        });
    }

    /**
     * Updates a user, returning the new object
     * @param {User} user fields to update
     * @returns {Promise<User>}
     */
    async updateUser(user) {
        let res = await request({
            uri: this.endpoint + "/users/self",
            method: "PUT",
            body: {
                token: this.token,
                user: user
            }
        });

        this.cachedUser = res;
        return this.cachedUser;        
    }

    /**
     * Create a post
     * @param {Post} post fields of post
     * @param {Number=} expires_in amount of days this post expires in, leave undefined if post doesn't expire
     * @returns {Promise<Post>}
     */
    async createPost(post, expires_in) {
        return await request({
            uri: this.endpoint + "/posts",
            method: "PUT",
            body: {
                token: this.token,
                post: post,
                expires_in: expires_in
            }
        });
    }
    /**
     * Deletes a post
     * @param {Number} pid post id
     * @returns {Promise<void>}
     */
    async deletePost(pid) {
        await request({
            uri: this.endpoint + "/posts",
            method: "DELETE",
            body: {
                token: this.token,
                pid: pid
            }
        });
    }

    /**
     * Get post details and comments
     * @param {Number} pid post id
     * @returns {Promise<Post>}
     */
    async getPost(pid) {
        return await request({
            uri: this.endpoint + "/posts/"+pid,
            method: "GET",
            qs: {
                token: this.token
            }
        });
    }


    /**
     * Gets rising posts
     * @param {String} type post type (e.g. meme)
     * @param {Number} offset offset for paging
     * @returns {Promise<Post[]>} 
     */
    async getRisingPosts(type, offset) {
        return await request({
            uri: this.endpoint + "/posts/rising",
            method: "GET",
            qs: {
                token: this.token,
                type: type,
                offset: offset
            }
        });
    }

    /**
     * Gets top posts for a set timespan in hours
     * @param {String} type post type (e.g. meme)
     * @param {String} timespan span of time for top (day, week, year, all)
     * @param {Number=} offset offset for paging
     * @returns {Promise<Post[]>} 
     */
    async getTopPosts(type, timespan, offset) {
        return await request({
            uri: this.endpoint + "/posts/top",
            method: "GET",
            qs: {
                token: this.token,
                type: type,
                offset: offset,
                timespan: timespan
            }
        }); 
    }

    /**
     * Gets newest post
     * @param {String} type post type (e.g. meme)
     * @param {String=} created_before when paging, pass the creation date of the last post you have, otherwise leave undefined
     * @returns {Promise<Post[]>}
     */
    async getNewestPosts(type, created_before) {
        return await request({
            uri: this.endpoint + "/posts/new",
            method: "GET",
            qs: {
                token: this.token,
                type: type,
                created_before: created_before
            }
        });
    }

    /**
     * Creates a comment on a post
     * @param {Number} pid post id
     * @param {String} caption post caption
     * @returns {Promise<Comment>}
     */
    async createComment(pid, caption) {
        return await request({
            uri: this.endpoint + "/comments",
            method: "PUT",
            body: {
                token: this.token,
                caption: caption,
                pid: pid
            }
        });
    }

    /**
     * Deletes a comment
     * @param {Number} cid comment id
     * @returns {Promise<void>}
     */
    async deleteComment(cid) {
        return await request({
            uri: this.endpoint + "/comments/"+cid,
            method: "DELETE",
            body: {
                token: this.token
            }
        });
    }

    /**
     * Reacts to a post
     * @param {Number} pid post id
     * @param {String} reaction reaction type
     * @returns {Promise<void>}
     */
    async reactToPost(pid, reaction) {
        await request({
            uri: this.endpoint + "/posts/"+pid+"/reactions",
            method: "PUT",
            body: {
                token: this.token,
                reaction: reaction
            }
        });    
    }

    /**
     * Unreacts to a post
     * @param {Number} pid post id
     * @returns {Promise<void>}
     */
    async unreactToPost(pid) {
        await request({
            uri: this.endpoint + "/posts/"+pid+"/reactions",
            method: "DELETE",
            body: {
                token: this.token
            }
        });
    }

    /**
     * Reacts to a comment
     * @param {Number} cid comment id
     * @param {String} reaction reaction type
     * @returns {Promise<void>}
     */
    async reactToComment(cid, reaction) {
        await request({
            uri: this.endpoint + "/comments/"+cid+"/reactions",
            method: "PUT",
            body: {
                token: this.token,
                reaction: reaction
            }
        });
    }

    /**
     * Unreacts to a comment
     * @param {Number} cid comment id
     * @returns {Promise<void>}
     */
    async unreactComment(cid) {
        await request({
            uri: this.endpoint + "/comments/"+cid+"/reactions",
            method: "DELETE",
            body: {
                token: this.token
            }
        });      
    }

    /**
     * Archived
     */
    /*
     * Follows a user
     * @param {Number} uid_to uid of account to follow
     * @returns {Promise<void>}

    async followUser(uid_to) {
        let res = await request({
            uri: this.endpoint + '/users/self/follows',
            method: 'PUT',
            body: {
                token: this.token,
                uid_to: uid_to
            }
        })

        throwIfFailed(res);
    }*/
    /*
     * Unfollows a user
     * @param {Number} uid_to uid of account to unfollow
     * @returns {Promise<void>}
     * 
    async unfollowUser(uid_to) {
        let res = await request({
            uri: this.endpoint + '/users/self/follows',
            method: 'DELETE',
            body: {
                token: this.token,
                uid_to: uid_to
            }
        })

        throwIfFailed(res);
    }*/
}

/**
 * @class
 */
class ClientError extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
    }

    /**
     * Gets error name
     * @returns {String} name of error: authentication, displayable, unknown, bad_request
     */
    getName() {
        return this.name;
    }

    /**
     * Gets error message
     * @returns {String} error message
     */
    getMessage() {
        return this.message;
    }
}

async function request(options) {
    let body = options.body ? JSON.stringify(options.body) : undefined;
    let qsAppend = options.qs ? "?" + qs.stringify(options.qs) : "";

    let response;
    try {
        response = await polyfetch(options.uri + qsAppend, {
            method: options.method,
            body: body,
            headers:{
                "Content-Type": "application/json"
            }
        });
    } catch (e) {
        throwIfFailed({status:-1});
    }

    const result = await response.json();
    throwIfFailed(response, result);

    return result.result;
}

function throwIfFailed(response, result) {
    if (response.status === 200) return;

    const message = result ? result.error : "No message";

    switch (response.status) {
    case 403:
        throw new ClientError("authentication", message);
    case 400:
        throw new ClientError("bad_request", message);
    case 409:
        throw new ClientError("displayable", message);
    default:
        throw new ClientError("networking", message);
    }
}

module.exports = {Client: Client, ClientError: ClientError};