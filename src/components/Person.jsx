import React from 'react';
import Person0 from '../utils/Person.json';

const Person = ({ idList }) => {
  return (
    <div className="flex justify-center mt-5 sm:px-0 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-24 gap-x-8 gap-y-12">
        {idList.map(id => {
          const member = Person0.find(member => member.id === id);
          if (!member) return null;

          return (
            <div
              key={member.id}
              className="w-full sm:w-48 max-w-xs bg-neutral-50 rounded-2xl flex flex-col items-center justify-center sm:h-64 p-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 sm:w-30 sm:h-24 object-cover rounded-full mx-auto"
              />
              <div className="mt-4 flex items-center justify-center whitespace-nowrap">
                <img src={member.logo} alt="logo" className="w-6 h-6 mr-2" />
                <span className="text-base fontEB text-black">{member.name}</span>
              </div>
              <div className="text-center whitespace-nowrap">
                <p className="pt-3 text-sm fontBold text-black">{member.major}</p>
                <p className="text-sm fontBold text-black">{member.role}</p>
                <div className="w-20 h-px bg-blue-500 mt-2 mx-auto sm:w-32" />
                <p className="text-blue-500 mt-2 text-sm fontBold">{member.position}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Person;
