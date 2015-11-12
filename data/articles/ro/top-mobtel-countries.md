---
model: top_mobtel_per_100
title: Țările cu cele mai multe abonamente de telefonie mobilă la 100 locuitori
---

<h2>Țările cu cele mai multe abonamente de telefonie mobilă pe cap de locuitor</h2>

<p>Țara cu cele mai multe abonamente de telefonie mobilă pe cap de locuitor este <strong><%= topCountries[0].topic.name.common %></strong> cu <%= topCountries[0].data.range/100 %> pe cap de locuitor.</p>

<table class="">
<thead><tr><th>Tara</th><th>Value</th></tr></thead>
<tbody>
<% topCountries.forEach(function(item){ %>
<tr><td><%= item.topic.name.common %></td><td><%= item.data.range %></td></tr>
<% }); %>
</tbody>
</table>

<p>Cele mai putine:</p>

<table class="">
<thead><tr><th>Tara</th><th>Value</th></tr></thead>
<tbody>
<% topCountries2.forEach(function(item){ %>
<tr><td><%= item.topic.name.common %></td><td><%= item.data.range %></td></tr>
<% }); %>
</tbody>
</table>
