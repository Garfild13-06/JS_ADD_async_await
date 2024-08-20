import GameSavingLoader from '../GameSavingLoader';
import GameSaving from '../GameSaving';

test('should correctly load and parse game saving', async () => {
    const saving = await GameSavingLoader.load();
    expect(saving).toBeInstanceOf(GameSaving);
    expect(saving.id).toBe(9);
    expect(saving.created).toBe(1546300800);
    expect(saving.userInfo).toEqual({
        id: 1,
        name: 'Hitman',
        level: 10,
        points: 2000,
    });
});

test('should throw an error when loading fails', async () => {
    jest.spyOn(global, 'setTimeout').mockImplementationOnce(() => {
        throw new Error('Loading error');
    });

    await expect(GameSavingLoader.load()).rejects.toThrow('Error loading game saving: Loading error');
});
