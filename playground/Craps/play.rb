# Play the game of craps!
require_relative "craps"

# Bet definition
def place_bet(game)
  name = ""; amount = -1
  until BETS.include?(name)
    puts "What bet would you like to make? Enter one of the following:"
    BETS.each { |key, value| puts key if (value[:needs_point] == false || game.point == true) }
    name = gets.chomp.intern
  end
  until (amount >= 0 && amount <= game.bankroll)
    puts "You can bet up to $#{ game.bankroll }. How much do you wanna wager?"
    amount = gets.chomp.to_i
  end
  game.bet(name,amount)
end

# Current bets
def print_unresolved_bets(game)
  if (! game.unresolved_bets.empty?)
    puts "You have these bets:"
    game.unresolved_bets.each {|bet| puts "#{bet.name} bet for #{bet.amount}" }
  end
end

# Get an action
def get_action(game)
  playing = true
  puts "You've got $#{game.bankroll} whacha wanna do? Type 'bet', 'roll', or 'walk away': "
  action = gets.chomp
  case action
    when 'bet'
      place_bet(game)
    when 'roll'
      game.roll
    when 'walk away'
      game.walk_away
      playing = false
    else
      puts "I don't understand #{action}."
  end
  playing
end

# Begin a game with $1000
craps = CrapsGame.new(1000)
playing = true

# Gameplay loop (play until you're out of money & bets)
while (playing && (craps.bankroll > 0 || (! craps.unresolved_bets.empty?))) do
  print_unresolved_bets(craps)
  playing = get_action(craps)
end

# End the game with a smarmy congratulatory message
puts "Congrats you left with $#{craps.bankroll}! That's gotta be a new record!"

exit