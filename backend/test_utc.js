
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const owner = await prisma.space_owner.findUnique({ where: { id_user: 17 } });
  const targetMonth = 9;
  const targetYear = 2026;

  const start = new Date(Date.UTC(targetYear, targetMonth - 1, 1));
  const end = new Date(Date.UTC(targetYear, targetMonth, 1));
  const validStatuses = ['selesai', 'aktif', 'disetujui'];

  const rows = await prisma.reservasi.findMany({
    where: {
      status: { in: validStatuses },
      tanggal_reservasi: { gte: start, lt: end },
      space: { id_owner: owner.id },
    },
    include: { space: true },
  });

  const totalSelectedRevenue = rows.reduce((sum, row) => sum + row.total_bayar, 0);
  console.log('Selected Month Revenue:', totalSelectedRevenue);

  const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const trendMonthsData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(Date.UTC(targetYear, targetMonth - 1 - i, 1));
    const m = d.getUTCMonth() + 1;
    const y = d.getUTCFullYear();
    const label = i === 0 ? ${monthNamesShort[m - 1]} (Now) : monthNamesShort[m - 1];
    trendMonthsData.push({ m, y, label, isCurrent: i === 0 });
  }

  const oldestDate = new Date(Date.UTC(trendMonthsData[0].y, trendMonthsData[0].m - 1, 1));
  const newestDate = new Date(Date.UTC(trendMonthsData[5].y, trendMonthsData[5].m, 1));

  const sixMonthRows = await prisma.reservasi.findMany({
    where: {
      status: { in: validStatuses },
      tanggal_reservasi: { gte: oldestDate, lt: newestDate },
      space: { id_owner: owner.id },
    },
    select: { tanggal_reservasi: true, total_bayar: true },
  });

  const monthlyTrends = [];
  let maxTrendAmount = 0;

  for (const tm of trendMonthsData) {
    const monthStart = new Date(Date.UTC(tm.y, tm.m - 1, 1));
    const monthEnd = new Date(Date.UTC(tm.y, tm.m, 1));

    const monthRevenue = sixMonthRows
      .filter((r) => r.tanggal_reservasi >= monthStart && r.tanggal_reservasi < monthEnd)
      .reduce((sum, r) => sum + r.total_bayar, 0);

    if (monthRevenue > maxTrendAmount) maxTrendAmount = monthRevenue;

    monthlyTrends.push({ month: tm.label, amount: monthRevenue });
  }

  for (const item of monthlyTrends) {
    const pct = maxTrendAmount > 0 ? Math.max(8, Math.round((item.amount / maxTrendAmount) * 100)) : 4;
    item.height = ${pct}%;
  }

  console.log('Monthly Trends Result:', JSON.stringify(monthlyTrends, null, 2));
}

main().then(() => prisma.()).catch(console.error);
