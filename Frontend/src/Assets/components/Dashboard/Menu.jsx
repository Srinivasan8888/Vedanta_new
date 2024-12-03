import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import menuicon from '../../images/menu.png'
export function Menus() {
  return (
    <div className="relative">
      <Menu>
        {({ open }) => (
          <>
            <MenuButton>
              <div>
                <img src={menuicon} alt="menu Logo" className="w-12 h-7 filter invert" />
              </div>
            </MenuButton>
            {open && (
              <div className='absolute right-0 w-48 mt-2 bg-white shadow-lg z-1'>
                <MenuItems>
                  <MenuItem>
                    {({ isActive }) => (
                      <a
                        className={`${isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700'
                          } block px-4 py-2 text-sm`}
                        href="/Dashboard"
                      >
                       Home
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ isActive }) => (
                      <a
                        className={`${isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700'
                          } block px-4 py-2 text-sm`}
                        href="/Report"
                      >
                        Report
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ isActive }) => (
                      <a
                        className={`${isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700'
                          } block px-4 py-2 text-sm`}
                        href="/Analytics"
                      >
                        Analytics
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ isActive }) => (
                      <a
                        className={`${isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700'
                          } block px-4 py-2 text-sm`}
                        href="/Settings"
                      >
                        Settings
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ isActive }) => (
                      <a
                        className={`${isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700'
                          } block px-4 py-2 text-sm`}
                        href="/Settings"
                      >
                        Logout
                      </a>
                    )}
                  </MenuItem>
                </MenuItems>
              </div>
            )}
          </>
        )}
      </Menu>
    </div>
  )
}