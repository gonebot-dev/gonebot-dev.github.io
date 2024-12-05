import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as e,o as p}from"./app-D2fNj2_6.js";const t={};function o(i,n){return p(),a("div",null,n[0]||(n[0]=[e(`<div class="hint-container warning"><p class="hint-container-title">注意</p><p>编写此文档时，<code>GoneBot</code> 版本为 <code>v1.1.4</code></p></div><p>在这里，我们以 <a href="https://github.com/goneplugin-echo" target="_blank" rel="noopener noreferrer">Echo</a> 插件为例：</p><p>插件的主体是一个 <code>plugin.GonePlugin</code> 类型，你可以在全局使用 <code>大驼峰命名法</code> 定义它，并在 <code>init()</code> 方法中确定它字段的具体内容：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> echo</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line highlighted">	<span class="token string">&quot;github.com/gonebot-dev/gonebot/plugin&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line highlighted"><span class="token keyword">var</span> Echo plugin<span class="token punctuation">.</span>GonePlugin</span>
<span class="line highlighted"></span>
<span class="line highlighted"><span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">  Echo<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Echo&quot;</span></span>
<span class="line highlighted">  Echo<span class="token punctuation">.</span>Version <span class="token operator">=</span> <span class="token string">&quot;v0.1.1&quot;</span></span>
<span class="line highlighted">  Echo<span class="token punctuation">.</span>Description <span class="token operator">=</span> <span class="token string">&quot;计算机学说话&quot;</span></span>
<span class="line highlighted"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，需要定义插件的 <code>Handlers</code> 字段，它是一个 <code>[]plugin.GoneHandler</code> 类型，包含一个或多个 <code>plugin.GoneHandler</code> 类型的元素：</p><p><code>Echo</code> 插件只需要一个 <code>plugin.GoneHandler</code>，在 <code>plugin.GoneHandler</code> 中，我们需要定义该响应器的 <code>Rule</code> 和 <code>Handler</code> 字段，分别表示该响应器的消息筛选规则和响应函数：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> echo</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line highlighted">	<span class="token string">&quot;github.com/gonebot-dev/gonebot/adapter&quot;</span></span>
<span class="line highlighted">	<span class="token string">&quot;github.com/gonebot-dev/gonebot/message&quot;</span></span>
<span class="line">	<span class="token string">&quot;github.com/gonebot-dev/gonebot/plugin&quot;</span></span>
<span class="line highlighted">	<span class="token string">&quot;github.com/gonebot-dev/gonebot/plugin/rule&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> Echo plugin<span class="token punctuation">.</span>GonePlugin</span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	Echo<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Echo&quot;</span></span>
<span class="line">	Echo<span class="token punctuation">.</span>Version <span class="token operator">=</span> <span class="token string">&quot;v0.1.1&quot;</span></span>
<span class="line">	Echo<span class="token punctuation">.</span>Description <span class="token operator">=</span> <span class="token string">&quot;Reply the same message of what you have sent&quot;</span></span>
<span class="line"></span>
<span class="line highlighted">	Echo<span class="token punctuation">.</span>Handlers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>Echo<span class="token punctuation">.</span>Handlers<span class="token punctuation">,</span> plugin<span class="token punctuation">.</span>GoneHandler<span class="token punctuation">{</span></span>
<span class="line highlighted">		Rules<span class="token punctuation">:</span> rule<span class="token punctuation">.</span><span class="token function">NewRules</span><span class="token punctuation">(</span>rule<span class="token punctuation">.</span><span class="token function">ToMe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">And</span><span class="token punctuation">(</span>rule<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">&quot;echo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line highlighted">		Handler<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>a <span class="token operator">*</span>adapter<span class="token punctuation">.</span>Adapter<span class="token punctuation">,</span> msg message<span class="token punctuation">.</span>Message<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">			reply <span class="token operator">:=</span> message<span class="token punctuation">.</span><span class="token function">NewReply</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span></span>
<span class="line highlighted">			a<span class="token punctuation">.</span><span class="token function">SendMessage</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span></span>
<span class="line highlighted">			<span class="token keyword">return</span> <span class="token boolean">true</span></span>
<span class="line highlighted">		<span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line highlighted">	<span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们先来看 <code>Rules</code> 字段：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line">Rules<span class="token punctuation">:</span> rule<span class="token punctuation">.</span><span class="token function">NewRules</span><span class="token punctuation">(</span>rule<span class="token punctuation">.</span><span class="token function">ToMe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">And</span><span class="token punctuation">(</span>rule<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">&quot;echo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><code>Rules</code> 字段可以由若干的规则构成，每个规则之间可以指定逻辑关系，收到的消息符合 <code>Rules</code> 中的规则，才会被传递给响应器。</p><p><code>Rules</code> 字段的具体介绍由 <a href="/zh/guide/plugin/rule">响应器规则</a> 给出。</p><p>接下来是 <code>Handler</code> 字段：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line">Handler<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>a <span class="token operator">*</span>adapter<span class="token punctuation">.</span>Adapter<span class="token punctuation">,</span> msg message<span class="token punctuation">.</span>Message<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span></span>
<span class="line">  reply <span class="token operator">:=</span> message<span class="token punctuation">.</span><span class="token function">NewReply</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span></span>
<span class="line">  a<span class="token punctuation">.</span><span class="token function">SendMessage</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token boolean">true</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Handler</code> 字段是一个 <code>func(a *adapter.Adapter, msg message.Message) bool</code>，它接收的两个参数分别为 <code>当前收到消息的适配器</code> 和 <code>当前收到的消息内容</code>，它返回一个 <code>bool</code> 值，表示在该响应器处理完消息后，是否继续将消息传递给下一个响应器。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>响应器的响应顺序与<code>插件的加载顺序</code>以及<code>插件中 plugin.GoneHandler 的编写顺序</code>有关，排得越前，响应越早。</p></div><p>你可以使用 <code>message.NewReply()</code> 快速创建一个空响应，在 Echo 中，插件需要返回和原消息完全一样的内容，你可以使用 <code>Join()</code> 将消息的内容合并进响应中。</p><p>之后，你可以调用 <code>a.SendMessage</code> 将响应移交给适配器处理。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p><strong>响应器可不止能做这些！</strong>，前往 <a href="/zh/guide/plugin/message">消息类型</a> 和 <a href="/zh/guide/plugin/action">适配器行为</a> 了解更多！</p></div><p>到这里，你应该已经完成了你的第一个插件的编写，恭喜你！接下来，你可以去详细了解 <a href="/zh/guide/plugin/rule">响应器规则</a>，<a href="/zh/guide/plugin/message">消息类型</a> 和 <a href="/zh/guide/plugin/action">适配器行为</a> 的更多写法了！</p>`,19)]))}const u=s(t,[["render",o],["__file","plugin.html.vue"]]),d=JSON.parse('{"path":"/zh/guide/plugin/plugin.html","title":"你的第一个插件","lang":"zh-CN","frontmatter":{"title":"你的第一个插件","icon":"plug-circle-check","order":1,"category":["文档"],"tag":["插件"],"author":"Kingcq"},"headers":[],"git":{"createdTime":1733397969000,"updatedTime":1733397969000,"contributors":[{"name":"Kingcq","email":"404291187@qq.com","commits":1}]},"readingTime":{"minutes":2.14,"words":641},"filePathRelative":"zh/guide/plugin/plugin.md","localizedDate":"2024年12月5日","excerpt":"<div class=\\"hint-container warning\\">\\n<p class=\\"hint-container-title\\">注意</p>\\n<p>编写此文档时，<code>GoneBot</code> 版本为 <code>v1.1.4</code></p>\\n</div>\\n<p>在这里，我们以 <a href=\\"https://github.com/goneplugin-echo\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Echo</a> 插件为例：</p>\\n<p>插件的主体是一个 <code>plugin.GonePlugin</code> 类型，你可以在全局使用 <code>大驼峰命名法</code> 定义它，并在 <code>init()</code> 方法中确定它字段的具体内容：</p>"}');export{u as comp,d as data};
