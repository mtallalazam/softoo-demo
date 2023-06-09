import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <section className="mx-auto w-full max-w-[900px] p-6">
        <header className="mb-10">
          <h1 className="text-center text-4xl">
            <span className="text-5xl uppercase">
              <b>Soft</b>oo
            </span>
            <br />
            Demo Assignment
          </h1>
        </header>
        <Outlet />
      </section>
    </main>
  );
};

export default MainLayout;
