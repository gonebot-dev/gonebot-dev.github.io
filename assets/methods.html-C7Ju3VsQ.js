import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,b as t,o as c}from"./app-D2fNj2_6.js";const d={};function o(l,e){return c(),n("div",null,e[0]||(e[0]=[t('<div class="hint-container warning"><p class="hint-container-title">注意</p><p>编写此文档时，<code>GoneBot</code> 版本为 <code>v1.1.4</code></p></div><p>本章节中，整理了一些适配器中常用的方法。</p><p><s>整理了一下，发现真的好少</s></p><h2 id="adapter-receivechannel-push-msg-true" tabindex="-1"><a class="header-anchor" href="#adapter-receivechannel-push-msg-true"><span><code>adapter.ReceiveChannel.Push(msg, true)</code></span></a></h2><p>将收到的已经规范化的消息推送到接收通道中，供 <code>GoneBot</code> 使用，第二个参数是 <code>isReceive</code>，因为 <code>SendChannel</code> 也在使用这个方法，只需要填写 <code>true</code> 即可</p><h2 id="adapter-sendchannel-pull-adapter-actionchannel-pull" tabindex="-1"><a class="header-anchor" href="#adapter-sendchannel-pull-adapter-actionchannel-pull"><span><code>adapter.SendChannel.Pull()</code>, <code>adapter.ActionChannel.Pull()</code></span></a></h2><p>分别从 <code>SendChannel</code> 和 <code>ActionChannel</code> 中取出一个消息或动作，用来处理，在没有消息或动作时会阻塞线程，直到有消息或动作再返回。</p><p><s>卧槽，没了</s></p>',8)]))}const i=a(d,[["render",o],["__file","methods.html.vue"]]),s=JSON.parse('{"path":"/zh/guide/adapter/methods.html","title":"常用方法","lang":"zh-CN","frontmatter":{"title":"常用方法","icon":"meteor","order":3,"category":["文档"],"tag":["适配器","方法"],"author":"Kingcq"},"headers":[{"level":2,"title":"adapter.ReceiveChannel.Push(msg, true)","slug":"adapter-receivechannel-push-msg-true","link":"#adapter-receivechannel-push-msg-true","children":[]},{"level":2,"title":"adapter.SendChannel.Pull(), adapter.ActionChannel.Pull()","slug":"adapter-sendchannel-pull-adapter-actionchannel-pull","link":"#adapter-sendchannel-pull-adapter-actionchannel-pull","children":[]}],"git":{"createdTime":1733397969000,"updatedTime":1733397969000,"contributors":[{"name":"Kingcq","email":"404291187@qq.com","commits":1}]},"readingTime":{"minutes":0.55,"words":165},"filePathRelative":"zh/guide/adapter/methods.md","localizedDate":"2024年12月5日","excerpt":"<div class=\\"hint-container warning\\">\\n<p class=\\"hint-container-title\\">注意</p>\\n<p>编写此文档时，<code>GoneBot</code> 版本为 <code>v1.1.4</code></p>\\n</div>\\n<p>本章节中，整理了一些适配器中常用的方法。</p>\\n<p><s>整理了一下，发现真的好少</s></p>\\n<h2><code>adapter.ReceiveChannel.Push(msg, true)</code></h2>\\n<p>将收到的已经规范化的消息推送到接收通道中，供 <code>GoneBot</code> 使用，第二个参数是 <code>isReceive</code>，因为 <code>SendChannel</code> 也在使用这个方法，只需要填写 <code>true</code> 即可</p>"}');export{i as comp,s as data};
