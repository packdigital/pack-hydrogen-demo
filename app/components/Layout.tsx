import {ReactNode} from 'react';

export function Layout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <>
      <header>
        <div className="w-full py-4 border-b border-b-gray-200">
          <div className="container grid grid-cols-3 items-center">
            <nav className="col-span-1 justify-self-start">
              <div className="hidden lg:block">
                <NavList />
              </div>
            </nav>

            <a className="col-span-1 justify-self-center" href="/">
              {/* Pack SVG Logo */}
              <svg
                width="40"
                height="45"
                viewBox="0 0 40 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1_7)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.7537 30.2151C24.6392 30.3352 24.4356 30.2552 24.4352 30.0905L24.4174 22.2708C24.4174 22.0682 24.2508 21.9035 24.0459 21.9035H19.7726C19.5675 21.9035 19.4012 22.0682 19.4012 22.2708V23.9217C18.9462 23.5597 18.4714 23.235 17.9799 22.9476C18.0414 22.9058 18.0907 22.8457 18.1185 22.7733C18.544 21.6662 18.9828 20.5936 19.3462 19.4963C19.5339 18.9283 19.8055 18.7171 20.4173 18.7232C23.296 18.752 26.175 18.7451 29.0539 18.728C29.595 18.7248 29.8892 18.8755 30.0712 19.4265C30.443 20.5511 30.8945 21.6498 31.3261 22.7704C31.3676 22.879 31.4577 22.9594 31.5663 22.9924C29.5603 25.1692 25.856 29.059 24.7537 30.2151ZM17.6609 37.6892C17.5083 37.5735 17.2929 37.5911 17.156 37.7249C13.783 41.0285 9.24461 40.2121 6.99631 37.9448C4.40742 35.3342 4.38845 30.9489 6.94464 28.2994C9.00794 26.1602 13.5417 24.9823 17.165 28.4648C17.3025 28.5967 17.5138 28.6143 17.6658 28.499C18.2422 28.063 18.8227 27.624 19.4012 27.1863V39.0075C18.8271 38.5728 18.2493 38.1348 17.6609 37.6892ZM8.08107 14.2495C8.41375 14.25 8.69568 14.2507 8.97759 14.2489C10.3081 14.2412 11.6406 14.2795 12.9681 14.214C14.317 14.1474 15.5474 13.7127 16.5636 13.012C15.4356 15.7914 14.3068 18.5738 13.1756 21.3617C11.3304 21.1628 9.4492 21.3945 7.68796 22.059V14.6359C7.68796 14.4224 7.86539 14.2493 8.08107 14.2495ZM7.74138 5.53132C7.74138 5.31891 7.91444 5.14806 8.12894 5.14546C9.60475 5.12785 11.0803 5.02598 12.5255 5.19106C13.7848 5.33478 14.5146 6.46147 14.475 7.62913C14.4355 8.79708 13.6342 9.82737 12.3646 9.94599C10.9997 10.0736 9.61497 9.99389 8.1304 9.98033C7.9159 9.97831 7.74138 9.80689 7.74138 9.59448V5.53132ZM21.463 13.9455C22.4217 11.3684 23.3689 8.82122 24.3679 6.13466C24.4879 5.81173 24.9501 5.81085 25.0715 6.13322C26.0774 8.80505 27.0329 11.3418 28.0126 13.9436C28.1036 14.1854 27.923 14.4443 27.6621 14.4443H21.8143C21.5539 14.4443 21.373 14.1871 21.463 13.9455ZM39.9097 44.2872C36.325 40.1599 32.8919 36.2067 29.4257 32.216C29.2996 32.0711 29.3075 31.8544 29.4426 31.7182C32.4892 28.6547 35.4956 25.6311 38.6214 22.4877C38.8532 22.2545 38.685 21.8583 38.3545 21.8594C37.7001 21.8614 37.0768 21.8643 36.4643 21.866C35.8044 20.2312 35.1597 18.6335 34.5138 17.0389C32.3441 11.6803 30.1781 6.32017 27.9916 0.96784C27.823 0.555147 27.808 -0.0185852 27.0601 0.000462204C25.4184 0.0425975 23.7751 0.0172009 22.0916 0.0146034C21.9383 0.0146034 21.7991 0.106955 21.7422 0.24779C20.9225 2.26797 20.1036 4.28555 19.2855 6.30285C18.6879 2.75397 15.7441 0.592088 12.5751 0.556301C9.55455 0.522246 6.53346 0.545911 3.51295 0.547931C3.35068 0.547931 3.18813 0.557455 3.0215 0.568134C2.81634 0.581697 2.65612 0.750526 2.65612 0.953988V25.4112C2.65612 25.4873 2.68005 25.5564 2.71769 25.6158C-1.29185 30.4336 -0.857887 37.5277 3.97375 41.8835C8.3405 45.8199 14.9462 45.8465 19.4012 42.2912V44.4497C19.4012 44.6526 19.5675 44.8171 19.7726 44.8171H24.1361C24.341 44.8171 24.5074 44.6526 24.5074 44.4497V34.9511C24.5074 34.6064 24.9443 34.4523 25.1649 34.7187L25.1695 34.7245C27.7876 37.8902 30.4135 41.0494 33.0115 44.2312C33.4104 44.7201 33.8234 44.9374 34.4663 44.91C35.6515 44.8598 36.8401 44.8959 38.0272 44.8959H39.6277C39.9453 44.8959 40.1165 44.5255 39.9097 44.2872Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_7">
                    <rect width="40" height="44.9123" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>

            <a href="/cart" className="col-span-1 justify-self-end">
              {/* Cart SVG Icon */}
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 2.45615L3 6.45615V20.4561C3 20.9865 3.21071 21.4952 3.58579 21.8703C3.96086 22.2454 4.46957 22.4561 5 22.4561H19C19.5304 22.4561 20.0391 22.2454 20.4142 21.8703C20.7893 21.4952 21 20.9865 21 20.4561V6.45615L18 2.45615H6Z"
                  stroke="#0A0A0A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6.45615H21"
                  stroke="#0A0A0A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 10.4561C16 11.517 15.5786 12.5344 14.8284 13.2845C14.0783 14.0347 13.0609 14.4561 12 14.4561C10.9391 14.4561 9.92172 14.0347 9.17157 13.2845C8.42143 12.5344 8 11.517 8 10.4561"
                  stroke="#0A0A0A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:hidden py-3 border-b border-b-gray-200 w-full">
          <NavList />
        </div>
      </header>

      <main
        role="main"
        id="mainContent"
        className="container flex-grow p-4 lg:px-6"
      >
        {children}
      </main>
    </>
  );
}

const NavList = () => {
  return (
    <ul className="flex items-center gap-6 uppercase text-xs font-bold">
      <li className="hover:underline">
        <a href="/">Shop all</a>
      </li>
      <li className="hover:underline">
        <a href="/">Story</a>
      </li>
      <li className="hover:underline">
        <a href="/">About this demo</a>
      </li>
    </ul>
  );
};
