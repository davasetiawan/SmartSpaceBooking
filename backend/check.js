
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const owners = await prisma.space_owner.findMany({ include: { space: true } });
  const members = await prisma.member.findMany();
  const resCount = await prisma.reservasi.count();
  console.log('Owners:', JSON.stringify(owners, null, 2));
  console.log('Members count:', members.length);
  console.log('Reservations count:', resCount);
}
main().then(() => prisma.()).catch(console.error);
