import Image from "next/image";
import { teamMembers } from "@/lib/data/about";
import { getInitials, getAvatarColor } from "@/lib/utils";

export function TeamSection() {
  return (
    <section className="bg-lepi-cream px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-lepi-indigo sm:text-4xl">
            Notre <span className="text-lepi-gold">Equipe</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Les membres devoues qui organisent et font vivre le Mamou Prestige Award.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center rounded-xl border border-lepi-indigo/10 bg-lepi-white p-6 text-center transition-shadow hover:shadow-md"
            >
              {member.imageUrl ? (
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-lepi-gold/20"
                />
              ) : (
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-lepi-white ${getAvatarColor(member.name)}`}
                >
                  {getInitials(member.name)}
                </div>
              )}
              <h3 className="mt-4 font-serif font-semibold text-lepi-indigo">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
