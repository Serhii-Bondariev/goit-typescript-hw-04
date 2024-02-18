import React, { createContext, useMemo, useState, useContext } from "react";
import noop from "lodash/noop";

// Опис типу MenuIds
type MenuIds = "first" | "second" | "last";

// Опис типу SelectedMenu
type SelectedMenu = {
  id: MenuIds;
};

// Опис типу MenuSelected
type MenuSelected = {
  selectedMenu: SelectedMenu;
};

// Опис типу MenuAction
type MenuAction = {
  onSelectedMenu: (selectedMenu: SelectedMenu) => void;
};

// Опис типу PropsProvider
type PropsProvider = {
  children: React.ReactNode;
};

// Опис типу PropsMenu
type PropsMenu = {
  menus: Menu[];
};

// Опис типу Menu
type Menu = {
  id: MenuIds;
  title: string;
};

// Контекст для меню, що вибрано
const MenuSelectedContext = createContext<MenuSelected>({
  selectedMenu: { id: "first" }, // Початкове значення з id "first"
});

// Контекст для дій з меню
const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

// Провайдер меню
function MenuProvider({ children }: PropsProvider) {
  // Стан для меню, що вибрано
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({ id: "first" });

  // Створення об'єкта з діями для меню
  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: (selectedMenu: SelectedMenu) => setSelectedMenu(selectedMenu),
    }),
    []
  );

  // Створення об'єкта з даними про меню, що вибрано
  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

// Компонент меню
function MenuComponent({ menus }: PropsMenu) {
  // Отримання дій з меню
  const { onSelectedMenu } = useContext(MenuActionContext);
  // Отримання даних про меню, що вибрано
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title} {selectedMenu.id === menu.id ? "Selected" : "Not selected"}
        </div>
      ))}
    </>
  );
}

// Компонент App
export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: "first",
      title: "First",
    },
    {
      id: "second",
      title: "Second",
    },
    {
      id: "last",
      title: "Last",
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}


