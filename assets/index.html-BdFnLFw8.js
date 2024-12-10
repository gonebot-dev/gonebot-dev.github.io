import{_ as e,a as t,b as a}from"./status-plugin-DBja8Xl-.js";import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as o,b as i,o as l}from"./app-PKT945-J.js";const c={};function r(p,n){return l(),o("div",null,n[0]||(n[0]=[i(`<div class="hint-container tip"><p class="hint-container-title">Tips</p><p><strong>You may need to install <a href="https://golang.google.cn/" target="_blank" rel="noopener noreferrer">Golang</a> first.</strong></p></div><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>When writing this document, the <code>GoneBot</code> version was <code>v1.1.4</code></p></div><h1 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h1><h2 id="configuring-onebotv11-protocol-services" tabindex="-1"><a class="header-anchor" href="#configuring-onebotv11-protocol-services"><span>Configuring OneBotV11 Protocol Services</span></a></h2><p><code>GoneBot</code> currently only supports the <code>OneBotV11 protocol adapter</code> as the adapter has not been fully developed.</p><p>We use <code>Lagrange.OneBot</code> as an example of protocol server:</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p><strong>You may need to go to the link below to install <code>Lagrange.OneBot</code> first.</strong></p><p><strong><a href="https://lagrangedev.github.io/Lagrange.Doc/Lagrange.OneBot/Config/" target="_blank" rel="noopener noreferrer">Lagrange.OneBot 快速部署 &amp; 配置</a></strong></p><p><strong>We will assume that you have already installed it <code>Lagrange.OneBot</code> locally.</strong></p></div><p>After installing <code>Lagrange.OneBot</code>，Start <code>Lagrange.OneBot</code> for the first time and exit immediately after it generates the configuration file. Change the <code>Implementations</code> field in the <code>appsettings.json</code>:</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>Don&#39;t forget to change the <code>Uin</code> Field in <code>Account</code> Field, filling it with the id of your QQ account for login!</p></div><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    ...<span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">&quot;Implementations&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">&quot;Type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ReverseWebSocket&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;Host&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0.0.0.0&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;Port&quot;</span><span class="token operator">:</span> <span class="token number">25565</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;Suffix&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/onebot/v11/ws&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;ReconnectInterval&quot;</span><span class="token operator">:</span> <span class="token number">5000</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;HeartBeatInterval&quot;</span><span class="token operator">:</span> <span class="token number">5000</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token property">&quot;AccessToken&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>This configures a reverse websocket, and it will attempt to connect to <code>ws://0.0.0.0:25565/onebot/v11/ws</code> every 5 seconds.</p><p>The address and port here are assumed that you are running <code>GoneBot</code> locally and the WebSocket port of the OneBotV11 adapter is configured as 25565, you can modify the specific address and port according to your actual needs.</p></div><p>After the configuration, launch <code>Lagrange.OneBot</code>.</p><h2 id="install-gonebot" tabindex="-1"><a class="header-anchor" href="#install-gonebot"><span>Install GoneBot</span></a></h2><p>We prepared a simple demo for <code>GoneBot</code>, you can download and run it:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> clone https://github.com/gonebot-dev/gonedemo.git</span>
<span class="line"><span class="token builtin class-name">cd</span> gonedemo</span>
<span class="line">go run gonedemo</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>gonedemo</code> is using the <code>.env</code> file below:</p><div class="language-.env line-numbers-mode" data-highlighter="prismjs" data-ext=".env" data-title=".env"><pre><code><span class="line">ONEBOTV11_HOST=&quot;0.0.0.0:25565&quot;</span>
<span class="line">COMMAND_START=&quot;/&quot;</span>
<span class="line">NICKNAME=&quot;bot&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As you can see, <code>gonedemo</code> configures the address of websocket to <code>ws://0.0.0.0:25565/onebot/v11/ws</code>. It is consistent with the previous configuration.</p><p>After waiting for several seconds, you will see that <code>gonedemo</code> successfully connected to <code>Lagrange.OneBot</code> and output related logs:</p><figure><img src="`+e+'" alt="Commandline output" tabindex="0" loading="lazy"><figcaption>Commandline output</figcaption></figure><p>If you see logs like above, then congratulations, your first QQ bot configuration is successful!</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p><code>gonedemo</code> is using <code>/</code> as the prefix of the command, you can modify it freely, but the related <code>Command</code> rules will be identified with the configuration as the prefix.</p><p>The definition of <code>Command</code> rules will be given in later chapters.</p></div><p><code>gonedemo</code> is configured with <a href="https://github.com/gonebot-dev/goneplugin-echo" target="_blank" rel="noopener noreferrer">Echo</a> 和 <a href="https://github.com/gonebot-dev/goneplugin-status" target="_blank" rel="noopener noreferrer">Status</a>.</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>You can test the Echo and Status plugins by sending <code>/echo</code> and <code>/status</code> to the bot account in private chat.</p><p>They will reply the same message as you send, or output the current server status information.</p></div><figure><img src="'+t+'" alt="Echo Plugin" tabindex="0" loading="lazy"><figcaption>Echo Plugin</figcaption></figure><figure><img src="'+a+'" alt="Status Plugin" tabindex="0" loading="lazy"><figcaption>Status Plugin</figcaption></figure><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>In local testing, it is possible that <code>Lagrange.OneBot</code> will not be able to send images to the QQ server all the time (it will clearly state the problem in the log), this may not be a problem with <code>GoneBot</code>.</p></div>',27)]))}const h=s(c,[["render",r],["__file","index.html.vue"]]),m=JSON.parse('{"path":"/quickstart/","title":"Quick Start","lang":"en-US","frontmatter":{"title":"Quick Start","index":false,"icon":"rocket","category":["Quick Start"],"tag":["Installation","Configuration","Running"]},"headers":[{"level":2,"title":"Configuring OneBotV11 Protocol Services","slug":"configuring-onebotv11-protocol-services","link":"#configuring-onebotv11-protocol-services","children":[]},{"level":2,"title":"Install GoneBot","slug":"install-gonebot","link":"#install-gonebot","children":[]}],"git":{"createdTime":1733397969000,"updatedTime":1733397969000,"contributors":[{"name":"Kingcq","email":"404291187@qq.com","commits":1}]},"readingTime":{"minutes":1.56,"words":467},"filePathRelative":"quickstart/README.md","localizedDate":"December 5, 2024","excerpt":"<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">Tips</p>\\n<p><strong>You may need to install <a href=\\"https://golang.google.cn/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Golang</a> first.</strong></p>\\n</div>\\n<div class=\\"hint-container warning\\">\\n<p class=\\"hint-container-title\\">Warning</p>\\n<p>When writing this document, the <code>GoneBot</code> version was <code>v1.1.4</code></p>\\n</div>"}');export{h as comp,m as data};