import path from 'path'
import fs from 'fs'
const Tool = require('../src/base')
const serialize = Tool.serialize
const query = Tool.query
const $ = Tool.$
const removeNode = Tool.removeNode
const insertAfter = Tool.insertAfter
const addClass = Tool.addClass
const removeClass = Tool.removeClass
const getAbsoluteUrl = Tool.getAbsoluteUrl
const debounce = Tool.debounce
const removeItemByIndex = Tool.removeItemByIndex
const jest = require('jest')
describe('query test group', () => {
  test('query 1', () => {
    expect(query('hello', '?hello=aaa')).toBe('aaaa')
  })
  test('query 2', () => {
    expect(query('hello', '?hello=aaa&bye=bbb')).toBe('aaa')
  })
  test('query 3', () => {
    expect(query('hello', '?hello1=aaa')).toBe(undefined)
  })
  test('query 4', () => {
    expect(query('hello', 'pre?hello=aaa?')).toBe('aaa')
  })
  test('query 5', () => {
    expect(query('hello', 'pre?hello1=aaa?hello=bbb')).toBe('bbb')
  })
  test('query 6', () => {
    expect(query('hello', 'pre?hello1=aaa&hello=bbb')).toBe('bbb')
  })
})

describe('serialize test group', () => {
  test('param为objec', () => {
    expect(serialize({hello: 'js', hi: 'test'})).toBe('hello=js&hi=test')
  })
  test('param为string', () => {
    expect(serialize('input a string')).toBe('param error')
  })
  test('param为number', () => {
    expect(serialize(123)).toBe('param error')
  })
  test('param为objec', () => {
    expect(serialize({hello: '', hi: 'test'})).toBe('hello=&hi=test')
  })
})

describe('$ test group', () => {
  test('模拟JQurey获取dom', () => {
    document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, './dom.html'))
    const div = document.getElementById('spanId')
    expect($('.wrapper')[0].nodeName.toLocaleLowerCase()).toBe('div')
    expect($('p')[0].nodeName.toLocaleLowerCase()).toBe('p')
    expect($('#spanId')[0].innerHTML).toBe('this is a Span article')
    expect($('wrap')).toBe(null)
  })
})

describe('removeNode test group', () => {
  test('删除元素', () => {
    document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, './dom.html'))
    let span = document.getElementById('spanId')
    removeNode(span)
    expect(document.getElementById('spanId')).toBeNull()
  })
})

describe('insertAfter test group', () => {
  test('测试新元素插入不同位置的情况', () => {
    document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, './dom.html'))
    const newSpan = document.createElement('span')
    const textNode = document.createTextNode('newTextNode For span')
    const newP = document.createElement('P')
    const textNode2 = document.createTextNode('newTextNode For p')
    const target1 = document.getElementsByClassName('wrapper')[0]
    const target2 = document.getElementsByClassName('wrapper')[2]
    newSpan.appendChild(textNode)
    newP.appendChild(textNode2)
    insertAfter(newSpan, target1)// target1不是父元素的最后一个子元素
    insertAfter(newP, target2)// target2时父元素的最后一个子元素时
    expect(document.getElementById('pageWrapper').children[1].innerHTML).toBe('newTextNode For span')
    expect(document.getElementById('pageWrapper').children[4].innerHTML).toBe('newTextNode For p')
  })
})

describe('addClass test group', () => {
  test('target已有class时，增加class', () => {
    document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, './dom.html'))
    const target = document.getElementsByClassName('wrapper')[0]
    addClass(target, 'selected')
    expect(target.className).toBe('wrapper selected')
  })
  test('target没有class时，增加class', () => {
    document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, './dom.html'))
    const target = document.getElementById('spanId')
    addClass(target, 'choice')
    expect(target.className).toBe('choice')
  })
  test('向target增加已存在的class', () => {
    document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, './dom.html'))
    const target = document.getElementsByClassName('wrapper')[0]
    addClass(target, 'wrapper')
    expect(target.className).toBe('wrapper')
  })
})

describe('removeClass test group', () => {
  test('检测删除存在或不存在的classname时的情况', () => {
    document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, './dom.html'))
    const target = document.getElementsByTagName('p')[0]
    removeClass(target, 'wrapper')// 删除target本身不存的class：wrapper
    expect(target.className).toBe('content')// 删除target的class：content
    removeClass(target, 'content')
    expect(target.className).toBe('')
    const span = document.getElementById('spanId')
    removeClass(span, 'notExistClass')// dom无class时
    expect(span.className).toBe('')
  })
})

describe('getAbsoluteUrl test group', () => {
  test('getAbsoluteUrl test 1', () => {
    const base = document.createElement('base')
    base.href = 'http://www.test.com'
    document.head.appendChild(base)
    expect(getAbsoluteUrl('/yjy')).toBe('http://www.test.com/yjy')
  }
  )
})

describe('debounce test group', () => {
  test('检测累加结果', (done) => {
    let count = 0
    const creatDebounce = debounce(() => {
      count += 1
      expect(count).toBe(1)
      done()
    }, 1000)

    for (let i = 0; i < 10; i++) {
      creatDebounce()
    }
    expect(count).toBe(0)// 调用10次creatDebounce后，马上检测count
  })
  test('忽略param:time', (done) => {
    let count = 0
    const creatDebounce = debounce(() => {
      count += 1
      expect(count).toBe(1)
      done()
    })
    creatDebounce()
    expect(count).toBe(0)
  })
})

describe('removeItemByIndex test group', () => {
  test('param 正确', () => {
    expect(removeItemByIndex(1, [0, 1, 2])).toEqual([0, 2])// index>0
    expect(removeItemByIndex(0, [0, 1, 2])).toEqual([1, 2])// index=0
    expect(removeItemByIndex(-1, [0, 1, 2])).toEqual([0, 1])// index<0
    expect(removeItemByIndex(-3, [0, 1, 2])).toEqual([1, 2])// index=-arr.length
  })
  test('index超出array长度', () => {
    expect(removeItemByIndex(3, [0, 1, 2])).toBe('index not exist')
    expect(removeItemByIndex(-4, [0, 1, 2])).toBe('index not exist')
  })
  test('index不为number', () => {
    expect(removeItemByIndex('a', [0, 1, 2])).toBe('index not number')
  })
})
