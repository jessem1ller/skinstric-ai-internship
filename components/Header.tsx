import Link from 'next/link';

function Header({ section }) {
  return (
    <header>
      <Link href="/">
        <h1>Skinstric</h1>
      </Link>
      <span> [{section}]</span>
    </header>
  );
}

export default Header;