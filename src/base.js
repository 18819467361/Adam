const Tool = {
  /**
   * 获取指定的 querystring 中指定 name 的 value
   * @param {String} name
   * @param {String} querystring
   * @return {String|undefined}
   *
   * query('hello', '?hello=js') 结果是 js
   *
   */
  query (name, querystring) {
    const Reg = new RegExp(`(?:\\?|&)${name}=(.*?)(?:\\?|&|$)`)
    const result = Reg.exec(querystring)
    if (result) {
      return result[1]
    } else {
      return undefined
    }
  },

  /**
 * 序列化对象，就是把对象转成 url 字符串
 * @param {Obj} data
 * @return {String}
 *
 * serialize({hello: 'js', hi: 'test'}) 结果是 ''
 */
  serialize (data) {
    let result
    if (typeof data === 'object') {
      let arr = []
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          arr.push(key + '=' + data[key])
        }
      }
      result = arr.join('&')
    } else {
      result = 'param error'
    }
    return result
  },

  /**
 * 根据选择器查找 DOM
 * 就是模拟 $() ，当然，这里返回元素的 DOM 对象即可
 * @param {String} selector
 * @return {DOM|Null}
 */
  $ (selector) {
    const result = document.querySelectorAll(selector)
    if (result[0] !== undefined) {
      return result
    } else {
      return null
    }
  },

  /**
 * 删除 DOM 节点
 * @param {DOM} node
 * @return {DOM}
 */
  removeNode (node) {
    return node.parentNode.removeChild(node)
  },

  /**
 * 在 target 节点之后插入 node 节点
 * 类似 $().insertAfter()
 * @param {DOM} node
 * @param {DOM} target
 */
  insertAfter (node, target) {
    let parent = target.parentNode
    let nodes = parent.childNodes
    let domNode = []
    const len = nodes.length
    for (let i = 0; i < len; i++) {
      if (nodes[i].nodeType === 1) {}
      domNode.push(nodes[i])
    }
    if (parent.childNodes[parent.childNodes.length - 2] === target) {
      parent.appendChild(node)
    } else {
      parent.insertBefore(node, target.nextSibling)
    }
  },

  /**
 * 添加类名
 * @param {DOM} node
 * @param {String|Array} className
 */
  addClass (node, className) {
    let oldClassName = node.className
    let newClassName
    if (oldClassName !== '') {
      let hasClassName = false
      let classNames = oldClassName.split(' ')
      for (let i = 0, len = classNames.length; i < len; i++) {
        if (classNames[i] === className) {
          hasClassName = true
          break
        }
      }
      if (!hasClassName) {
        classNames.push(className)
      }
      newClassName = classNames.join(' ')
    } else {
      newClassName = className
    }
    node.className = newClassName
  },

  /**
 * 移除类名
 * @param {DOM} node
 * @param {String|Array} className
 */
  removeClass (node, className) {
    let oldClassName = node.className
    let newClassName
    if (oldClassName !== '') {
      let classNames = oldClassName.split(' ')
      for (let len = classNames.length, i = len - 1; i >= 0; i--) {
        if (classNames[i] === className) {
          classNames.splice(i, 1)
        }
      }
      newClassName = classNames.join(' ')
    } else {
      newClassName = ''
    }
    node.className = newClassName
  },

  /**
 * 获取绝对路径
 * @param {String} url
 * @return {String}
 *
 * getAbsoluteUrl('/jerojiang') => 'http://imweb.io/jerojiang'
 * 在当前页面获取绝对路径，这里要创建 A 元素，测试用例看你们的了
 */
  getAbsoluteUrl (url) {
    const el = document.createElement('a')
    el.href = url
    return el.href
  },

  /**
 * 防抖动
 * 防抖动函数了啦，有做个这个习题，不清楚回去复习
 */
  debounce (callback, time = 500) {
    let timer
    return function () {
      if (!timer) {
        timer = setTimeout(() => {
          callback()
          clearTimeout(timer)
          timer = null
        }, time)
      }
    }
  },

  /**
 *  根据所以移出数组的某一项
 * @param {Number} index
 * @param {Array} arr
 * @return {Array}
 *
 * removeItemByIndex(1, [1,2,3]) => [1, 3]
 */
  removeItemByIndex (index, arr) {
    const len = arr.length
    if (typeof index !== 'number') {
      return 'index not number'
    }
    if (index >= len || Math.abs(index) > len) {
      return 'index not exist'
    }
    arr.splice(index, 1)
    return arr
  }
}
module.exports = Tool
