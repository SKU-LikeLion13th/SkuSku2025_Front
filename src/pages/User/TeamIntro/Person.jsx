import React from 'react';
import Person0 from '../../../utils/Person.json';

const Person = ({ idList }) => {
  return (
    <div className="flex justify-center px-4 mt-5 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-24 gap-x-8 gap-y-12">
        {idList.map(id => {
          const member = Person0.find(member => member.id === id);
          if (!member) return null;

          return (
            <div
              key={member.id}
              className="flex flex-col items-center justify-center w-full max-w-xs p-4 sm:w-48 bg-neutral-50 rounded-2xl sm:h-64">
              <img
                src={member.image}
                alt={member.name}
                className="object-cover w-24 h-24 mx-auto rounded-full sm:w-30 sm:h-24"
              />
              <div className="flex items-center justify-center mt-4 whitespace-nowrap">
                <img src={member.logo} alt="logo" className="w-6 h-6 mr-2" />
                <span className="text-base text-black fontEB">{member.name}</span>
              </div>
              <div className="text-center whitespace-nowrap">
                <p className="pt-3 text-sm text-black fontBold">{member.major}</p>
                <p className="text-sm text-black fontBold">{member.role}</p>
                <div className="w-20 h-[1.5px] bg-blue-500 mt-2 mx-auto sm:w-32" />
                <p className="mt-2 text-sm text-blue-500 fontBold">{member.position}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Person;
