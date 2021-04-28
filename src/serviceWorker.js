// 这些代码是用来注册service worker服务的
// register() 方法需要手动调用 并不会自动执行

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  )
  
  export function register (config) {
     //如果当前是生产环境且浏览器支持 service worker 那么就进行注册操作
     //之所以要是生产环境是因为开发环境总是进行缓存那么开发者要频繁的清空缓存才能获取最新的内容，这样不利于快速开发
     // 如果浏览器不支持 service worker 只能放弃注册
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // 如果浏览器支持sw的话 那么就存在URL构造方法
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href)
      // 生成静态文件夹的路径，service worker 主要是用于缓存静态文件
      if (publicUrl.origin !== window.location.origin) {
        // 如果静态文件与当前环境不是在同一个域下，那么注册没什么意义，那么直接返回
       // see https://github.com/facebook/create-react-app/issues/2374
        return
      }
      // 当页面加载完毕之后才执行 service worker 的操作，主要是为了避免阻塞页面的加载
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
         // 如果是本地环境进行访问
        if (isLocalhost) {
          // 检查service worker服务是否存在
          checkValidServiceWorker(swUrl, config)
          // 添加一些额外的打印
          navigator.serviceWorker.ready.then(() => {
            console.log(
              'This web app is being served cache-first by a service ' +
                'worker. To learn more, visit https://bit.ly/CRA-PWA'
            )
          })
        } else {
          // 如果不是本地地址，那么只注册 service worker
          // 这样做是因为此时已不再是开发环境了，开发者已经将其暴露在外网（网内网）环境中，其它用户已经可以对其进行访问了
          registerValidSW(swUrl, config)
        }
      })
    }
  }
  // 注册有效的 service worker
  function registerValidSW (swUrl, config) {
  // 通过注册 service worker 然后使用相应 API 来进行操作
    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
      // 如果发现内容有更新，那么就会自动在后台进行安装，当安装结束之后再判断安装状态,向用户进行提示
        registration.onupdatefound = () => {
          const installingWorker = registration.installing
          if (installingWorker == null) {
            return
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // 在这一步我们已经获取到了预缓存的内容,但是之前的service worker服务还是缓存着旧的数据，我们需要关闭所以的标签页来更新缓存
                console.log(
                  'New content is available and will be used when all ' +
                    'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                )
  
                //执行回调函数
                if (config && config.onUpdate) {
                  config.onUpdate(registration)
                }
              } else {
                //在这个节点 所有数据都被缓存了 这是提醒用户可以使用完整的缓存数据的绝佳位置
                console.log('Content is cached for offline use.')
  
                //执行回调函数
                if (config && config.onSuccess) {
                  config.onSuccess(registration)
                }
              }
            }
          }
        }
      })
      .catch(error => {
        console.error('Error during service worker registration:', error)
      })
  }
  
  // 检查 service worker 的状态
  function checkValidServiceWorker (swUrl, config) {
    //检查service work的状态 如果不存在 重新加载请求
    fetch(swUrl)
      .then(response => {
        // 确保service work存在
        const contentType = response.headers.get('content-type')
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          // 没有找到service work服务 很有可能是不在同一个app 重新加载
          navigator.serviceWorker.ready.then(registration => {
            registration.unregister().then(() => {
              window.location.reload()
            })
          })
        } else {
          // 找到service work服务 走正常流程
          registerValidSW(swUrl, config)
        }
      })
      .catch(() => {
        console.log(
          'No internet connection found. App is running in offline mode.'
        )
      })
  }
  // 取消 service worker 的注册
  export function unregister () {
  // 如果浏览器支持 service worker 且 service worker 处于就绪状态的时候，那么调用其提供的取消注册方法来进行操作 
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister()
      })
    }
  }
