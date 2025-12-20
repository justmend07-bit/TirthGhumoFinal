import { GraduationCap, Briefcase, User, Camera, Users, Heart, CheckCircle } from 'lucide-react';

function WhoCanJoin() {
  const roles = [
    { icon: GraduationCap, label: 'College Students' },
    { icon: User, label: 'Freshers' },
    { icon: Briefcase, label: 'Working Professionals' },
    { icon: Camera, label: 'Creators' },
    { icon: Users, label: 'Young Adults' },
    { icon: Heart, label: 'People who enjoy helping elders' },
    { icon: CheckCircle, label: 'Anyone who loves meaningful travel' },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Who Can Join the Saarthi Family?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900">
                    {role.label}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-3xl p-8 sm:p-12 text-center shadow-xl">
          
          <p className="text-2xl sm:text-3xl text-white font-semibold leading-relaxed">
            If you can walk with someone with kindness,
            <span className="block mt-2">you can be a Saarthi.</span>
          </p>
        </div>

      </div>
    </section>
  );
}

export default WhoCanJoin;
