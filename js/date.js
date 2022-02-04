(function() {
  var times = document.getElementsByTagName('time');
  if (times.length === 0) { return; }
  var posts = document.getElementsByClassName('post-content');
  if (posts.length === 0) { return; }

  var pubTime = new Date(times[0].dateTime);  /* ���·���ʱ��� */
  var now = Date.now()  /* ��ǰʱ��� */
  var interval = parseInt(now - pubTime)
  /* ����ʱ�䳬��ָ��ʱ�䣨���룩 */
  if (interval > 3600*24*30*1000){
    var days = parseInt(interval / 86400000)
    posts[0].innerHTML = '<div class="note note-warning" style="font-size:0.9rem"><p>' +
      '<div class="h6">����ʱЧ����ʾ</div><p>����һƪ������ ' + days + ' ��ǰ�����£�������Ϣ�����ѷ����ı䣬��ע�����' +
      '</p></p></div>' + posts[0].innerHTML;
  }
})();