---
model: top_mobtel_per_100
title: Țările cu cele mai multe abonamente de telefonie mobilă la 100 locuitori
---

Aici este list:

<table class="">
<thead><tr><th>Tara</th><th>Value</th></tr></thead>
<tbody>
<% topCountries.forEach(function(item){ %>
<tr><td><%= item.topic.name.common %></td><td><%= item.data.range %></td></tr>
<% }); %>
</tbody>
</table>
