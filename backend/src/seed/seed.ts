import prisma from "../client"

async function main() {
    const user1 = await prisma.user.create({
      data: {
        name: 'John Doe',
        password_hash: 'password123',
        email: 'john@example.com',
        phone: '1234567890',
        city: 'New York',
        rating_sum: 4.5,
        rating_count: 10,
      },
    });
  
    const user2 = await prisma.user.create({
      data: {
        name: 'Jane Smith',
        password_hash: 'password456',
        email: 'jane@example.com',
        phone: '9876543210',
        city: 'Los Angeles',
        rating_sum: 4.2,
        rating_count: 8,
      },
    });
  
    const fundsAccount1 = await prisma.fundsAccount.create({
      data: {
        userId: user1.id,
        balance: 100.0,
        balanceBlocked: 50.0,
      },
    });
  
    const fundsAccount2 = await prisma.fundsAccount.create({
      data: {
        userId: user2.id,
        balance: 200.0,
        balanceBlocked: 25.0,
      },
    });
  
    const item1 = await prisma.item.create({
      data: {
        name: 'Item 1',
        description: 'This is item 1',
        category: 'Electronics',
        userId: user1.id,
        image: 'item1.jpg',
        blocked: true,
      },
    });
  
    const item2 = await prisma.item.create({
      data: {
        name: 'Item 2',
        description: 'This is item 2',
        category: 'Furniture',
        userId: user2.id,
        image: 'item2.jpg',
        blocked: true,
      },
    });
  
    const offer1 = await prisma.offer.create({
      data: {
        itemId: item1.id,
        price: 50.0,
        image: 'offer1.jpg',
        userName: user1.name,
        userId: user1.id,
      },
    });
  
    const offer2 = await prisma.offer.create({
      data: {
        itemId: item2.id,
        price: 75.0,
        image: 'offer2.jpg',
        userName: user2.name,
        userId: user2.id,
      },
    });
  
    const counterOffer1 = await prisma.counterOffer.create({
      data: {
        userId: user2.id,
        offerId: offer1.id,
        status: null,
        price: 45.0,
      },
    });
  
    const counterOffer2 = await prisma.counterOffer.create({
      data: {
        userId: user1.id,
        offerId: offer2.id,
        status: true,
        price: 70.0,
      },
    });
  
    console.log('Seeding completed!');
  }
  
  main()
    .catch((error) => {
      console.error(error);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });