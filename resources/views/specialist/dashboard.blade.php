<div>
    <!-- Do what you can, with what you have, where you are. - Theodore Roosevelt -->
    <h1>داشبورد کاربر متخصص</h1>

    <a href="{{ route('logout') }}" class="logout-link"
       onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
        <span>خروج از حساب</span>
    </a>

    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>

</div>
