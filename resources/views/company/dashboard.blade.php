<div>
    <!-- Order your soul. Reduce your wants. - Augustine -->

    <h1>داشبورد مدیر شرکت</h1>

    <a href="{{ route('logout') }}" class="logout-link"
       onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
        <span>خروج از حساب</span>
    </a>

    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>

</div>
