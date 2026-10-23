import { useState } from 'react'
import Alert from '@mui/material/Alert'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Select from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

type GameStatus = '未プレイ' | 'プレイ中' | 'クリア'
type StatusFilter = GameStatus | 'すべて'

type Game = {
  id: number
  title: string
  status: GameStatus
  rating: number
  favorite: boolean
}

const initialGames: Game[] = [
  {
    id: 1,
    title: 'Counter-Strike 2',
    status: 'プレイ中',
    rating: 4,
    favorite: true,
  },
  {
    id: 2,
    title: 'レインボーシックス シージ',
    status: '未プレイ',
    rating: 0,
    favorite: false,
  },
  {
    id: 3,
    title: 'VALORANT',
    status: 'クリア',
    rating: 5,
    favorite: true,
  },
]

function App() {
  const [games, setGames] = useState<Game[]>(initialGames)
  const [newGame, setNewGame] = useState('')
  const [newStatus, setNewStatus] = useState<GameStatus>('未プレイ')
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('すべて')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const addGame = () => {
    const title = newGame.trim()

    if (title === '') {
      setMessage('ゲーム名を入力してください。')
      return
    }

    setGames((currentGames) => [
      ...currentGames,
      {
        id: Date.now(),
        title,
        status: newStatus,
        rating: 0,
        favorite: false,
      },
    ])
    setNewGame('')
    setMessage(`${title}を追加しました。`)
  }

  const updateGame = (id: number, changes: Partial<Game>) => {
    setGames((currentGames) =>
      currentGames.map((game) =>
        game.id === id ? { ...game, ...changes } : game,
      ),
    )
  }

  const deleteGame = (id: number) => {
    setGames((currentGames) =>
      currentGames.filter((game) => game.id !== id),
    )
    setMessage('ゲームを削除しました。')
  }

  const visibleGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchText.trim().toLowerCase())
    const matchesStatus =
      statusFilter === 'すべて' || game.status === statusFilter
    const matchesFavorite = !favoritesOnly || game.favorite

    return matchesSearch && matchesStatus && matchesFavorite
  })

  return (
    <Box className="min-h-screen bg-slate-100">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ゲーム管理アプリ
          </Typography>
          <Badge badgeContent={games.length} color="secondary">
            <Chip label="登録ゲーム" color="default" />
          </Badge>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack spacing={2}>
            <Typography component="h1" variant="h4">
              ゲーム一覧
            </Typography>

            <Alert severity="info">
              ゲームを追加したり、状態や評価を管理できます。
            </Alert>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="body2">登録ゲーム数</Typography>
                <Typography variant="h5">{games.length} 件</Typography>
              </CardContent>
            </Card>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              sx={{ alignItems: { sm: 'center' } }}
            >
              <TextField
                fullWidth
                label="ゲーム名"
                size="small"
                value={newGame}
                onChange={(event) => setNewGame(event.target.value)}
              />

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel id="new-status-label">プレイ状況</InputLabel>
                <Select
                  labelId="new-status-label"
                  label="プレイ状況"
                  value={newStatus}
                  onChange={(event) =>
                    setNewStatus(event.target.value as GameStatus)
                  }
                >
                  <MenuItem value="未プレイ">未プレイ</MenuItem>
                  <MenuItem value="プレイ中">プレイ中</MenuItem>
                  <MenuItem value="クリア">クリア</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={addGame}
                sx={{ whiteSpace: 'nowrap' }}
              >
                ゲームを追加
              </Button>
            </Stack>

            <Divider />

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              sx={{ alignItems: { sm: 'center' } }}
            >
              <TextField
                fullWidth
                label="ゲームを検索"
                size="small"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />

              <FormControl size="small" sx={{ minWidth: 170 }}>
                <InputLabel id="filter-status-label">状態で絞り込み</InputLabel>
                <Select
                  labelId="filter-status-label"
                  label="状態で絞り込み"
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as StatusFilter)
                  }
                >
                  <MenuItem value="すべて">すべて</MenuItem>
                  <MenuItem value="未プレイ">未プレイ</MenuItem>
                  <MenuItem value="プレイ中">プレイ中</MenuItem>
                  <MenuItem value="クリア">クリア</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={favoritesOnly}
                    onChange={(event) =>
                      setFavoritesOnly(event.target.checked)
                    }
                  />
                }
                label="お気に入りのみ"
              />
            </Stack>

            <Chip
              label={`${visibleGames.length} 件表示`}
              color="primary"
              variant="outlined"
              sx={{ alignSelf: 'flex-start' }}
            />

            {visibleGames.length === 0 ? (
              <Alert severity="warning">該当するゲームがありません。</Alert>
            ) : (
              <List disablePadding>
                {visibleGames.map((game) => (
                  <ListItem
                    key={game.id}
                    disableGutters
                    sx={{ display: 'block', mb: 1.5 }}
                  >
                    <Card variant="outlined">
                      <CardContent>
                        <Stack spacing={1.5}>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: 'center' }}
                          >
                            <ListItemText
                              primary={game.title}
                              secondary={`プレイ状況：${game.status}`}
                            />

                            <Chip
                              label={game.status}
                              size="small"
                              color={
                                game.status === 'クリア'
                                  ? 'success'
                                  : game.status === 'プレイ中'
                                    ? 'primary'
                                    : 'default'
                              }
                            />

                            <Tooltip title="ゲームを削除">
                              <IconButton
                                aria-label={`${game.title}を削除`}
                                color="error"
                                onClick={() => deleteGame(game.id)}
                              >
                                ×
                              </IconButton>
                            </Tooltip>
                          </Stack>

                          <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={1.5}
                            sx={{ alignItems: { sm: 'center' } }}
                          >
                            <FormControl size="small" sx={{ minWidth: 150 }}>
                              <InputLabel id={`status-${game.id}`}>
                                プレイ状況
                              </InputLabel>
                              <Select
                                labelId={`status-${game.id}`}
                                label="プレイ状況"
                                value={game.status}
                                onChange={(event) =>
                                  updateGame(game.id, {
                                    status: event.target.value as GameStatus,
                                  })
                                }
                              >
                                <MenuItem value="未プレイ">未プレイ</MenuItem>
                                <MenuItem value="プレイ中">プレイ中</MenuItem>
                                <MenuItem value="クリア">クリア</MenuItem>
                              </Select>
                            </FormControl>

                            <Rating
                              name={`rating-${game.id}`}
                              value={game.rating}
                              onChange={(_, value) =>
                                updateGame(game.id, { rating: value ?? 0 })
                              }
                            />

                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={game.favorite}
                                  onChange={(event) =>
                                    updateGame(game.id, {
                                      favorite: event.target.checked,
                                    })
                                  }
                                />
                              }
                              label="お気に入り"
                            />
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </ListItem>
                ))}
              </List>
            )}
          </Stack>
        </Paper>
      </Container>

      <Snackbar
        open={message !== null}
        autoHideDuration={3000}
        onClose={() => setMessage(null)}
      >
        <Alert severity="success" onClose={() => setMessage(null)}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default App